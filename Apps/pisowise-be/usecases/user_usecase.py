from fastapi import HTTPException
from sqlalchemy.orm import Session
from repositories.user_repository import UserRepository
from models.base import User
from models.user import UserCreate, UserResponse
from typing import List

class UserUseCase:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def create_user_usecase(self, user: UserCreate) -> UserResponse:
        return self.repo.create_user(user)

    def get_all_users_usecase(self) -> List[User]:
        return self.repo.get_all_users()

    def get_user_by_email_usecase(self, email: str) -> UserResponse:
        if not email:
            raise HTTPException(status_code=400, detail="Email query parameter is required.")
        
        user = self.repo.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail=f"No user found with email: {email}")

        return user

