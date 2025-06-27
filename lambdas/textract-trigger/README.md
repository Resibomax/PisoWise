# Textract Trigger Lambda Function

This AWS Lambda function is triggered by S3 object creation events and serves as the foundation for document processing using Amazon Textract.

## Overview

The function processes uploaded documents (PDF, JPG, PNG, TIFF) and logs relevant information for future Textract analysis. It validates file types and extracts metadata from S3 objects.

## Files

- `handler.py`: Main Lambda function code
- `requirements.txt`: Python dependencies

## Supported File Types

- PDF (.pdf)
- JPEG (.jpg, .jpeg)
- PNG (.png)
- TIFF (.tiff, .tif)

## Testing

1. Upload a supported file to the configured S3 bucket
2. Check CloudWatch Logs for processing confirmation
3. Verify the function processes the object metadata correctly

## Future Enhancements

- Add Textract document analysis: analyzeExpense api
- Implement result storage in S3
