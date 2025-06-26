from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.insight import AIInsightCreate, AIInsightResponse
from usecases.insight_usecase import AIInsightUseCase
from typing import List
from db.database import get_db

insight_router = APIRouter()

@insight_router.post("/insights", response_model=AIInsightResponse)
def create_insight(insight: AIInsightCreate, db: Session = Depends(get_db)):
    uc = AIInsightUseCase(db)
    return uc.create_insight_usecase(insight)

@insight_router.get("/insights", response_model=List[AIInsightResponse])
def get_insights(db: Session = Depends(get_db)):
    uc = AIInsightUseCase(db)
    return uc.get_all_insights_usecase()

@insight_router.get("/insights/latest", response_model=AIInsightResponse)
def get_latest_insight(project_id: str = None, db: Session = Depends(get_db)):
    uc = AIInsightUseCase(db)
    return uc.get_latest_insight_usecase(project_id)
