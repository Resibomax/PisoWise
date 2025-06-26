from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.receipt import ReceiptCreate, ReceiptUpdate, ReceiptResponse
from usecases.receipt_usecase import ReceiptUseCase
from typing import List
from db.database import get_db

receipt_router = APIRouter()

@receipt_router.post("/receipts", response_model=ReceiptResponse)
def create_receipt_usecase(receipt: ReceiptCreate, db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    return uc.create_receipt_usecase(receipt)

@receipt_router.get("/receipts", response_model=List[ReceiptResponse])
def get_all_receipts_usecase(db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    return uc.get_all_receipts_usecase()

@receipt_router.put("/receipts/{receipt_id}", response_model=ReceiptResponse)
def update_receipt_usecase(
    receipt_id: str, updates: ReceiptUpdate, db: Session = Depends(get_db)
):
    uc = ReceiptUseCase(db)
    return uc.update_receipt_usecase(receipt_id, updates)

@receipt_router.delete("/receipts/{receipt_id}", response_model=bool)
def delete_receipt_usecase(receipt_id: str, db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    return uc.delete_receipt_usecase(receipt_id)
