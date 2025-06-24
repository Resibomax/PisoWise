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
