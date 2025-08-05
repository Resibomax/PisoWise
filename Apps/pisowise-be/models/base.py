from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import uuid

Base = declarative_base()

# User Model
class User(Base):
    __tablename__ = "User"
    user_id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, nullable=False, unique=True, index=True)
    username = Column(String, nullable=False)

    # relationship to the Project model
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")

# Project Model
class Project(Base):
    __tablename__ = "Project"
    project_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("User.user_id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    budget = Column(Float, nullable=False)
    amount_spent = Column(Float, nullable=False)
    creation_date = Column(Date, nullable=False)

    # relationship to the User model
    user = relationship("User", back_populates="projects")

    # relationship to the Receipt Model
    receipts = relationship("Receipt", back_populates="project", cascade="all, delete-orphan")

    # relationship to the ai_insights
    ai_insights = relationship("AIInsight", back_populates="project", cascade="all, delete-orphan")


# Receipt Model
class Receipt(Base):
    __tablename__ = "Receipt"
    receipt_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey("Project.project_id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    transaction_date = Column(Date, nullable=False)
    vendor_name = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

    # relationship to the Project model
    project = relationship("Project", back_populates="receipts")

    # relationship to the Item Model
    items = relationship("Item", back_populates="receipt", cascade="all, delete-orphan")


# Item Model
class Item(Base):
    __tablename__ = "Item"
    item_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    receipt_id = Column(String, ForeignKey("Receipt.receipt_id"), nullable=False)
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    # relationship to the Receipt Model
    receipt = relationship("Receipt", back_populates="items")


# AI Insight Model
class AIInsight(Base):
    __tablename__ = "AIInsight"
    insight_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey("Project.project_id"), nullable=False)
    generated_text = Column(Text, nullable=False)
    ai_model = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)

    # relationship to the Project Model
    project = relationship("Project", back_populates="ai_insights")

"""
OPTIONAL: Uncomment the following code to add a ProjectStats model

class ProjectStats(Base):
    __tablename__ = "ProjectStats"
    stats_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey('Project.project_id'), nullable=False)
    receipt_count = Column(Integer, nullable=False)
    total_expenses = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
"""
