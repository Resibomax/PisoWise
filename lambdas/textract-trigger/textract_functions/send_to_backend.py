import requests

def send_to_backend(extracted_data, project_id):
    backend_url = "https://your-fastapi-url.com/receipts"
    payload = transform_extracted_data_to_payload(extracted_data, project_id)

    try:
        response = requests.post(backend_url, json=payload)
        response.raise_for_status()
        print("✅ Sent to backend successfully")
    except requests.exceptions.RequestException as e:
        print("❌ Error sending to backend:", e)

