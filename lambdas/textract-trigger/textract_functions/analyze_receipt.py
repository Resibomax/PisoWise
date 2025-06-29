# import send_to_backend as send_to_backend

def extract_expense_fields(response):
    wanted_summary = ["INVOICE_RECEIPT_DATE", "VENDOR_NAME", "VENDOR_ADDRESS", "TOTAL"]
    wanted_line = ["ITEM", "QUANTITY", "UNIT_PRICE", "PRICE"]

    result = {}

    doc = response['ExpenseDocuments'][0]

    # Extract summary fields
    for field in doc['SummaryFields']:
        key = field.get('Type', {}).get('Text', '')
        if key in wanted_summary:
            result[key] = field['ValueDetection'].get('Text', '')

    # Extract line items
    line_items = []
    for group in doc.get('LineItemGroups', []):
        for item in group.get('LineItems', []):
            item_data = {}
            for field in item.get('LineItemExpenseFields', []):
                key = field.get('Type', {}).get('Text', '')
                if key in wanted_line:
                    item_data[key] = field['ValueDetection'].get('Text', '')
            if item_data:
                line_items.append(item_data)

    result['LINE_ITEMS'] = line_items
    return result


def analyze_receipt(s3_client, textract_client, bucket, document_key):
    print(f"Received document: {document_key}")
    print("Analyzing document. Please wait...")

    try:
        response = textract_client.analyze_expense(
            Document={'S3Object': {'Bucket': bucket, 'Name': document_key}})
        print(response)
    except Exception as e:
        print(e)
        print(f"Error getting document: {e}")

    extracted_data = extract_expense_fields(response)
    print("Extracted data: ", extracted_data)
    """
    try:
        print(f"Sending to backend: {extracted_data}")
        send_to_backend(extracted_data)
    except Exception as e:
        print(f"Error sending to backend: {e}")
    """
