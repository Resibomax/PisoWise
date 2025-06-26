from pydantic import BaseModel, EmailStr

# User Create Model
class UserCreate(BaseModel):
    email: EmailStr
    username: str

# User Response Model
class UserResponse(BaseModel):
    user_id: str
    email: EmailStr
    username: str

    class Config:
        from_attributes = True
