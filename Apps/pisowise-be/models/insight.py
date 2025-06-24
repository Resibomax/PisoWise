from pydantic import BaseModel, EmailStr

class AIInsightCreate(BaseModel):
    project_id: str
    generated_text: str
    ai_model: str

class AIInsightResponse(BaseModel):
    insight_id: str
    project_id: str
    generated_text: str
    ai_model: str

    class Config:
        from_attributes = True
