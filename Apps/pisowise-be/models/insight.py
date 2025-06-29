from datetime import datetime
from pydantic import BaseModel, EmailStr

class TriggerInsightRequest(BaseModel):
    project_id: str
    message: str

class AIInsightCreate(BaseModel):
    project_id: str
    generated_text: str
    ai_model: str
    created_at: datetime

class AIInsightResponse(BaseModel):
    insight_id: str
    project_id: str
    generated_text: str
    ai_model: str
    created_at: datetime

    class Config:
        from_attributes = True
