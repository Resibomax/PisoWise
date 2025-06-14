from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "User"
    user_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False)
