from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from usecases.item_usecase import ItemUseCase
from models.item import ItemCreate, ItemUpdate, ItemResponse
from db.database import get_db

item_router = APIRouter()


@item_router.post("/items", response_model=ItemResponse)
def create_item_usecase(item: ItemCreate, db: Session = Depends(get_db)):
    return ItemUseCase(db).create_item_usecase(item)


@item_router.get("/items", response_model=List[ItemResponse])
def get_all_items_usecase(
    receipt_id: Optional[str] = Query(default=None), db: Session = Depends(get_db)
):
    uc = ItemUseCase(db)
    if receipt_id:
        return uc.get_items_by_receipt_id_usecase(receipt_id)
    return uc.get_all_items_usecase()


@item_router.put("/items/{item_id}", response_model=ItemResponse)
def update_item_usecase(item_id: str, updates: ItemUpdate, db: Session = Depends(get_db)):
    return ItemUseCase(db).update_item_usecase(item_id, updates)


@item_router.delete("/items/{item_id}", response_model=bool)
def delete_item_usecase(item_id: str, db: Session = Depends(get_db)):
    return ItemUseCase(db).delete_item_usecase(item_id)
