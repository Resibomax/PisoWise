from sqlalchemy.orm import Session
from models.base import Project, User, Receipt
from models.project import ProjectCreate, ProjectUpdate
from typing import List, Optional

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db  

    def get_user_by_id(self, user_id: str) -> Optional[User]:
        return self.db.query(User).filter(User.user_id == user_id).first()

    def create_project(self, project: ProjectCreate) -> Project:
        project_data = project.model_dump()
        project = Project(**project_data)
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def get_all_projects(self) -> List[Project]:
        return self.db.query(Project).all()

    def get_projects_by_user_id(self, user_id: str) -> List[Project]:
        return self.db.query(Project).filter(Project.user_id == user_id).all()

    def get_project_by_id(self, project_id: str) -> Optional[Project]:
        return self.db.query(Project).filter(Project.project_id == project_id).first()

    def update_project(self, project: Project, updates: ProjectUpdate) -> Project:
        for key, value in updates.model_dump(exclude_unset=True).items():
            setattr(project, key, value)
        self.db.commit()
        self.db.refresh(project)
        return project

    def calculate_project_total(self, project: Project) -> Project:
        amount_spent = 0.0
        for receipt in project.receipts:
            amount_spent += receipt.total_amount

        project.amount_spent = amount_spent

        self.db.commit()
        self.db.refresh(project)
        return amount_spent

    def delete_project(self, project: Project) -> None:
        if not project:
            return False

        self.db.delete(project)
        self.db.commit()
        return True




