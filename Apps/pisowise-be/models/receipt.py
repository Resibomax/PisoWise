from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from models.item import ItemResponse

class ReceiptCreate(BaseModel):
    project_id: str
    total_amount: float
    transaction_date: date
    vendor_name: Optional[str] = None
    image_url: Optional[str] = None

class ReceiptUpdate(BaseModel):
    total_amount: Optional[float] = None
    transaction_date: Optional[date] = None
    vendor_name: Optional[str] = None

class ReceiptResponse(BaseModel):
    receipt_id: str
    project_id: str
    total_amount: float
    transaction_date: date
    vendor_name: Optional[str] = None
    image_url: Optional[str] = None
    items: Optional[List[ItemResponse]] = None

    class Config:
        from_attributes = True
