from pydantic import BaseModel, Field
from typing import Optional

# Project Create Model 
class ProjectCreate(BaseModel):
    user_id: str
    name: str
    description: Optional[str] = None
    budget: float
    creation_date: str

    class Config:
        from_attributes = True

# Project Update Model 
class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    budget: Optional[float] = None

    class Config:
        from_attributes = True

# Project Response Model 
class ProjectResponse(BaseModel):
    project_id: str
    user_id: str
    name: str
    description: Optional[str] = None
    budget: float 
    creation_date: str

    class Config:
        from_attributes = True
