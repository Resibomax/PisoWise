from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.user import UserCreate, UserResponse
from usecases.user_usecase import UserUseCase
from typing import List
from db.database import get_db

user_router = APIRouter()


@user_router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    uc = UserUseCase(db)
    return uc.create_user_usecase(user)


@user_router.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    uc = UserUseCase(db)
    return uc.get_all_users_usecase()
