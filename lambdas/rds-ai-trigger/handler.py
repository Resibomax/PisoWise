import os
import json
import boto3
import psycopg2
import uuid
from datetime import datetime, timezone

print('Loading function')

def get_db_credentials():
    try:
        secret_name = os.environ["DB_SECRET_ID"]
        print(f"Fetching secret: {secret_name}")
        
        client = boto3.client("secretsmanager", region_name="ap-southeast-1")
        response = client.get_secret_value(SecretId=secret_name)
        
        credentials = json.loads(response["SecretString"])
        required_keys = {"host", "port", "dbname", "username", "password"}
        if not required_keys.issubset(credentials):
            raise ValueError(f"Secret is missing one of: {required_keys}")
        
        return credentials
    except Exception as e:
        print(f"Error getting DB credentials: {str(e)}")
        raise

def lambda_handler(event, context):
    print("EVENT:", json.dumps(event))
    
    try:
        if 'Records' in event and event['Records']:
            sns_message = json.loads(event['Records'][0]['Sns']['Message'])
            message = {
                "message": f"RDS Event: {sns_message.get('Event Message', '')}",
                "project_id": sns_message.get('Source ID', 'default'),
                "source_type": sns_message.get('Source Type', ''),
                "event_categories": sns_message.get('Event Categories', []),
                "raw_event": sns_message
            }
        else:
            message = event
        
        print(f"Processing message: {message}")
        
        bedrock = boto3.client("bedrock-runtime", region_name="ap-southeast-1")
        
        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 500,
            "messages": [
                {
                    "role": "user",
                    "content": f"Analyze this issue and provide insights: {message['message']}"
                }
            ]
        }

        print("Calling Bedrock...")
        try:
            response = bedrock.invoke_model(
                modelId="us.anthropic.claude-3-haiku-20240307-v1:0",
                contentType="application/json",
                accept="application/json",
                body=json.dumps(body)
            )
        except Exception as cross_region_error:
            print(f"Cross-region profile failed: {cross_region_error}")
            response = bedrock.invoke_model(
                modelId="anthropic.claude-3-haiku-20240307-v1:0",
                contentType="application/json",
                accept="application/json",
                body=json.dumps(body)
            )

        response_body = json.loads(response['body'].read())
        print(f"Bedrock response: {response_body}")
        
        ai_result = response_body.get("content", [{}])[0].get("text", "No result from Claude 3 Haiku")
        
        creds = get_db_credentials()

        print(f"Connecting to DB at {creds['host']}:{creds['port']}")
        conn = psycopg2.connect(
            host=creds["host"],
            dbname=creds["dbname"],
            user=creds["username"],
            password=creds["password"],
            port=int(creds["port"])
        )
        
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO "AIInsight" (insight_id, project_id, generated_text, ai_model, created_at) 
            VALUES (%s, %s, %s, %s, %s) RETURNING insight_id""",
            (
                str(uuid.uuid4()),
                message["project_id"],
                ai_result,
                "claude-3-haiku-20240307",
                datetime.now(timezone.utc)
            )
        )
        row = cur.fetchone()
        print(f"Insert returned: {row}")
        if row is None:
            raise Exception("INSERT did not return any rows. Check if the statement includes RETURNING.")
        insight_id = row[0]

        conn.commit()
        cur.close()
        conn.close()

        print(f"Successfully inserted insight with ID: {insight_id}")
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "AI insight generated and stored successfully",
                "insight_id": str(insight_id),
                "project_id": message["project_id"]
            })
        }

    except Exception as e:
        print(f"Error processing event: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {"statusCode": 500, "body": f"Error: {str(e)}"}
