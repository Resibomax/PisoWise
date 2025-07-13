from fastapi import APIRouter, Depends, Query, HTTPException, File, UploadFile
from models.receipt import UploadResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from models.receipt import ReceiptCreate, ReceiptUpdate, ReceiptResponse
from usecases.receipt_usecase import ReceiptUseCase
from db.database import get_db

receipt_router = APIRouter()

@receipt_router.post("/receipts/upload-image", response_model=UploadResponse)
async def upload_receipt_image(
    file: UploadFile = File(...),
    project_id: str = Query(..., description="Project ID to associate with the receipt"),  # Required
    db: Session = Depends(get_db)
):
    uc = ReceiptUseCase(db)
    result = await uc.upload_receipt_image_usecase(file, project_id)
    return result

@receipt_router.post("/receipts", response_model=ReceiptResponse)
def create_receipt(receipt: ReceiptCreate, db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    return uc.create_receipt_usecase(receipt)

@receipt_router.get("/receipts", response_model=List[ReceiptResponse])
def get_receipts(
        project_id: Optional[str] = Query(default=None),
        db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    if project_id:
        return uc.get_receipts_by_project_id_usecase(project_id)
    return uc.get_all_receipts_usecase()

@receipt_router.get("/receipts/{receipt_id}", response_model=ReceiptResponse)
def get_receipt_by_id(
        receipt_id: str,
        db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    return uc.get_receipt_by_id_usecase(receipt_id)

@receipt_router.put("/receipts/{receipt_id}", response_model=ReceiptResponse)
def update_receipt(
    receipt_id: str, updates: ReceiptUpdate, db: Session = Depends(get_db)
):
    uc = ReceiptUseCase(db)
    return uc.update_receipt_usecase(receipt_id, updates)

@receipt_router.delete("/receipts/{receipt_id}", response_model=bool)
def delete_receipt(receipt_id: str, db: Session = Depends(get_db)):
    uc = ReceiptUseCase(db)
    return uc.delete_receipt_usecase(receipt_id)
