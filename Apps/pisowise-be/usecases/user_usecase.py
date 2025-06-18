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
