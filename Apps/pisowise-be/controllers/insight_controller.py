from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.insight import AIInsightCreate, AIInsightResponse, TriggerInsightRequest
from usecases.insight_usecase import AIInsightUseCase
from typing import List
from db.database import get_db
import boto3
import json
import time

insight_router = APIRouter()

@insight_router.post("/insights/trigger", response_model=AIInsightResponse)
def trigger_ai_insight(request: TriggerInsightRequest, db: Session = Depends(get_db)):
    """User triggers AI insight generation"""
    try:
        lambda_client = boto3.client('lambda', region_name='ap-southeast-1')
        
        payload = {
            "project_id": request.project_id,
            "message": request.message,
            "source_type": "api_trigger",
            "event_categories": ["manual"]
        }
        
        print(f"Calling Lambda with payload: {payload}")
        
        response = lambda_client.invoke(
            FunctionName='rds-ai-trigger-function-dev-processRDSEvent',
            InvocationType='RequestResponse',  # Synchronous
            Payload=json.dumps(payload)
        )

        raw_payload = response['Payload'].read()
        print("Raw Lambda Payload:", raw_payload)

        response_payload = json.loads(raw_payload)

        # Parse nested body if it's a stringified JSON
        body = response_payload.get("body")
        if isinstance(body, str):
            try:
                body = json.loads(body)
            except json.JSONDecodeError:
                print("Warning: body is not JSON-decoded. Proceeding with raw string.")
                body = {"message": body}

        print(f"Lambda response status: {response_payload.get('statusCode')}, body: {body}")

        if response_payload.get('statusCode') != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Lambda function failed: {body.get('message', 'Unknown error')}"
            )

        # Slight delay to allow DB write to complete
        time.sleep(1)

        # Fetch most recent insight for the project
        uc = AIInsightUseCase(db)
        latest_insight = uc.get_latest_insight_usecase(request.project_id)

        return latest_insight

    except Exception as e:
        print(f"Error triggering AI insight: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate insight: {str(e)}")


@insight_router.post("/insights", response_model=AIInsightResponse)
def create_insight(insight: AIInsightCreate, db: Session = Depends(get_db)):
    """Create a new AI insight (for direct API calls)"""
    uc = AIInsightUseCase(db)
    return uc.create_insight_usecase(insight)

@insight_router.get("/insights", response_model=List[AIInsightResponse])
def get_insights(db: Session = Depends(get_db)):
    """Get all AI insights"""
    uc = AIInsightUseCase(db)
    return uc.get_all_insights_usecase()

@insight_router.get("/insights/latest", response_model=AIInsightResponse)
def get_latest_insight(project_id: str = None, db: Session = Depends(get_db)):
    """Get the latest insight for a project"""
    uc = AIInsightUseCase(db)
    return uc.get_latest_insight_usecase(project_id)
