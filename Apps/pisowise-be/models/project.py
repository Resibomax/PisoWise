from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date
from models.receipt import ReceiptResponse

# Project Create Model 
class ProjectCreate(BaseModel):
    user_id: str
    name: str
    description: Optional[str] = None
    budget: float
    amount_spent: float
    creation_date: date

    class Config:
        from_attributes = True

# Project Update Model 
class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    budget: Optional[float] = None
    amount_spent: float

    class Config:
        from_attributes = True

# Project Response Model 
class ProjectResponse(BaseModel):
    project_id: str
    user_id: str
    name: str
    description: Optional[str] = None
    budget: float 
    amount_spent: float
    creation_date: date
    receipts: Optional[List[ReceiptResponse]] = None

    class Config:
        from_attributes = True
