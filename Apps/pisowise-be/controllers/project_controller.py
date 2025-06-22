from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.base import Project
from models.project import ProjectCreate, ProjectUpdate, ProjectResponse
from usecases.project_usecase import ProjectUseCase 
from typing import List
from db.database import get_db

project_router = APIRouter()

@project_router.post("/projects", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    uc = ProjectUseCase(db)
    return uc.create_project_usecase(project)

@project_router.get("/projects", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    uc = ProjectUseCase(db)
    return uc.get_all_projects_usecase()

@project_router.put("/projects/{project_ud}", response_model=ProjectResponse)
def update_project(project_id: str, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    uc = ProjectUseCase(db)
    return uc.update_project_usecase(project_id, project_update)


@project_router.delete("/projects/{project_id}", response_model=bool)
def delete_project(project_id: str, db: Session = Depends(get_db)):
    uc = ProjectUseCase(db)
    return uc.delete_project_usecase(project_id)
