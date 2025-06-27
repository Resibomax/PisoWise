from pydantic import BaseModel, EmailStr
from typing import Optional, List
from models.project import ProjectResponse

# User Create Model
class UserCreate(BaseModel):
    email: EmailStr
    username: str

# User Response Model
class UserResponse(BaseModel):
    user_id: str
    email: EmailStr
    username: str
    projects: Optional[List[ProjectResponse]] = None

    class Config:
        from_attributes = True
