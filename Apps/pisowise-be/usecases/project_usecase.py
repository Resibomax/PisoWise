from sqlalchemy.orm import Session
from repositories.project_repository import ProjectRepository 
from models.base import Project 
from models.project import ProjectCreate, ProjectUpdate, ProjectResponse
from typing import List 

class ProjectUseCase:
    def __init__(self, db: Session):
        self.repo = ProjectRepository(db)

    def create_project_usecase(self, project: ProjectCreate) -> ProjectResponse:
        return self.repo.create_project(project)

    def get_all_projects_usecase(self) -> List[ProjectResponse]:
        return self.repo.get_all_projects()

    def get_projects_by_user_usecase(self, user_id: str) -> List[ProjectResponse]:
        return self.repo.get_projects_by_user_id(user_id)

    def update_project_usecase(self, project_id: str, project_update: ProjectUpdate) -> ProjectResponse:
        return self.repo.update_project(project_id, project_update)

    def delete_project_usecase(self, project_id: str) -> bool:
        return self.repo.delete_project(project_id)
