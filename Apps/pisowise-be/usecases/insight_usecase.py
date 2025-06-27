from fastapi import HTTPException
from sqlalchemy.orm import Session
from repositories.insight_repository import AIInsightRepository
from models.base import AIInsight
from models.insight import AIInsightCreate, AIInsightResponse
from typing import List

class AIInsightUseCase:
    def __init__(self, db: Session):
        self.repo = AIInsightRepository(db)

    def create_insight_usecase(self, insight: AIInsightCreate) -> AIInsightResponse:
        return self.repo.create_insight(insight)

    def get_all_insights_usecase(self) -> List[AIInsight]:
        return self.repo.get_all_insights()

    def get_latest_insight_usecase(self, project_id: str) -> AIInsightResponse:
        if project_id is None:
            raise HTTPException(status_code=400, detail="project_id is required")

        insight = self.repo.get_latest_insight_by_project_id(project_id)
        if not insight:
            raise HTTPException(status_code=404, detail="No insight found for this project")

        return insight
    
