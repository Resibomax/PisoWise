# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0
import json
import urllib.parse
import boto3
import io
from textract_functions.analyze_receipt import analyze_receipt

print('Loading function')

# AWS Client
try:
    session = boto3.Session(region_name='ap-southeast-1')
    s3_client = session.client('s3')
    textract_client = session.client('textract')
    rds_client = session.client('rds')
except Exception as e:
    print(f"Error creating AWS clients: {e}")



def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    # Only process supported file types
    allowed_extensions = ('.pdf', '.jpg', '.jpeg', '.png', '.tiff')
    if not key.lower().endswith(allowed_extensions):
        print(f"Skipping unsupported file type: {key}")
        return {
            'statusCode': 200,
            'body': json.dumps(f'Skipped unsupported file type: {key}')
        }

    try:
        document = s3_client.get_object(Bucket=bucket, Key=key)
        textract_handler(bucket, key)
        print("CONTENT TYPE: " + document['ContentType'])
        return {
            'statusCode': 200,
            'body': json.dumps('Successfully extracted the receipt!')
        }
    except Exception as e:
        print(e)
        print(f'Error getting object {document} from bucket {bucket}. Make sure they exist and your bucket is in the same region as this function.')
        raise e

def textract_handler(bucket, document_key):
    print("Analyzing receipt...")
    try:
        analyze_receipt(s3_client, textract_client, bucket, document_key)
    except Exception as e:
        print(f"Error analyzing receipt: {e}")


