from sqlalchemy.orm import Session
from models.base import Project
from models.project import ProjectCreate, ProjectUpdate
from uuid import uuid4
from typing import List

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db  

    def create_project(db: Session, project: ProjectCreate) -> Project:
        project_data = project.model_dump()
        project = Project(**project_data)
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def get_all_projects(self) -> List[Project]:
        return self.db.query(Project).all()

    def get_projects_by_user_id(db: Session, user_id:str) -> List[Project]:
        return self.db.query(Project).filter(Project.user_id == user_id).all()

    def update_project(db: Session, project_id: str, project_update: ProjectUpdate) -> Project:
        project = db.query(Project).filter(Project.project_id == project_id).first()
        if not project:
            return None
        for key, value in project_update.model_dump(exclude_unset=True).items():
            setattr(project, key, value)
        db.commit()
        db.refresh(project)
        return project

    def delete_project(db: Session, project_id: str) -> bool:
        project = db.query(Project).filter(Project.project_id == project_id).first()
        if not project:
            return False
        db.delete(project)
        db.commit()
        return True

