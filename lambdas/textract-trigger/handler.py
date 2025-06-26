# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0
import json
import urllib.parse
import boto3

print('Loading function')

s3 = boto3.client('s3')


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
        response = s3.get_object(Bucket=bucket, Key=key)
        print("CONTENT TYPE: " + response['ContentType'])
        return {
            'statusCode': 200,
            'body': json.dumps({'ContentType': response['ContentType']})
        }
    except Exception as e:
        print(e)
        print(f'Error getting object {key} from bucket {bucket}. Make sure they exist and your bucket is in the same region as this function.')
        raise e

