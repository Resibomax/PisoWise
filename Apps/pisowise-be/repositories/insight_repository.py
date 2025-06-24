from sqlalchemy.orm import Session
from models.base import AIInsight
from models.insight import AIInsightCreate
from typing import List

class AIInsightRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_insight(self, insight: AIInsightCreate) -> AIInsight:
        insight_data = insight.model_dump()
        insight = AIInsight(**insight_data)
        self.db.add(insight)
        self.db.commit()
        self.db.refresh(insight)
        return insight

    def get_all_insights(self) -> List[AIInsight]:
        return self.db.query(AIInsight).all()

    def get_latest_insight_by_project_id(self, project_id: str) -> AIInsight:
        return (
            self.db.query(AIInsight)
            .filter(AIInsight.project_id == project_id)
            .order_by(AIInsight.created_at.desc())
            .first()
        )
