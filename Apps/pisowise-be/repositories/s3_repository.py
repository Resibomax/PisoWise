import boto3
import os
from botocore.exceptions import ClientError

class S3Repository:
    def __init__(self):
        print("Initializing S3Repository")

        self.s3_client = boto3.client('s3')
        self.bucket_name = "pisowise-receipts"

    async def upload_file(self, file_content: bytes, key: str, content_type: str, project_id: str = None) -> str:
        try:
            if not file_content:
                raise ValueError("file_content cannot be None")
            if not key:
                raise ValueError("key cannot be empty")
            if not content_type:
                content_type = "application/octet-stream"

            metadata = {"project_id": project_id} if project_id else {}

            self.s3_client.put_object(
                Body=file_content,
                Bucket=self.bucket_name,
                Key=key,
                ContentType=content_type,
                Metadata=metadata,
            )

            return f"https://{self.bucket_name}.s3.{os.getenv('AWS_REGION')}.amazonaws.com/{key}"

        except Exception as e:
            raise Exception(f"S3 upload error: {str(e)}")
        
    async def delete_file(self, key: str) -> bool:
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=key
            )
            return True
        except ClientError as e:
            raise Exception(f"S3 delete error: {str(e)}")