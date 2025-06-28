import os, json, boto3, psycopg2

def get_db_credentials():
    secret_name = os.environ["DB_SECRET_ID"]
    client = boto3.client("secretsmanager", region_name="ap-southeast-1")
    return json.loads(client.get_secret_value(SecretId=secret_name)["SecretString"])

def lambda_handler(event, context):
    print("EVENT:", json.dumps(event))
    message = event  # direct input from FastAPI

    bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")
    response = bedrock.invoke_model(
        modelId="amazon.nova-lite-v1:0",
        contentType="application/json",
        accept="application/json",
        body=json.dumps({
            "prompt": f"Human: {message['message']}\nAssistant:",
            "max_tokens_to_sample": 100
        })
    )
    ai_result = json.loads(response['body'].read())["completion"]

    creds = get_db_credentials()
    conn = psycopg2.connect(
        host=creds["host"],
        dbname=creds["dbname"],
        user=creds["username"],
        password=creds["password"],
        port=int(creds.get("port", 5432))
    )
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO ai_insights (project_id, input_data, ai_result) VALUES (%s, %s, %s)",
        (message["project_id"], json.dumps(message), ai_result)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {"statusCode": 200, "body": "Insight inserted"}
