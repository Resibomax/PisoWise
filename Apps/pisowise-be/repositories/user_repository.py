from sqlalchemy.orm import Session, joinedload
from models.base import User  # SQLAlchemy model defined here
from models.base import UserCreate
from typing import List


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreate) -> User:
        user_data = user.model_dump()
        user = User(**user_data)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_all_users(self) -> List[User]:
        return self.db.query(User).all()
