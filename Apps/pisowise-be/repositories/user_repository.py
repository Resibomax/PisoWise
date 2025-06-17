from sqlalchemy.orm import Session
from models.base import User, UserResponse  # SQLAlchemy model defined here
from models.base import UserCreate
from typing import List


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreate) -> User:
        user = user.model_dump()
        user = User(**user)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_all_users(self) -> List[UserResponse]:
        return self.db.query(UserResponse).all()
