from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class ItemCreate(BaseModel):
    receipt_id: str
    item_name: str
    quantity: int = Field(gt=0, description="Quantity must be greater than 0")
    unit_price: float = Field(gt=0, description="Unit price must be greater than 0")

class ItemUpdate(BaseModel):
    item_name: Optional[str] = None
    quantity: Optional[int] = Field(default=None, gt=0)
    unit_price: Optional[float] = Field(default=None, gt=0)

class ItemResponse(BaseModel):
    item_id: UUID
    receipt_id: str
    item_name: str
    quantity: int
    unit_price: float
    total_price: float

    class Config:
        from_attributes = True
