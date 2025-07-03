from fastapi import HTTPException
from sqlalchemy.orm import Session
from repositories.receipt_repository import ReceiptRepository
from models.base import Receipt
from models.receipt import ReceiptCreate, ReceiptUpdate, ReceiptResponse
from typing import List

class ReceiptUseCase:
    def __init__(self, db: Session):
        self.repo = ReceiptRepository(db)

    def create_receipt_usecase(self, receipt: ReceiptCreate) -> ReceiptResponse:
        return self.repo.create_receipt(receipt)

    def get_all_receipts_usecase(self) -> List[Receipt]:
        return self.repo.get_all_receipts()

    def get_receipts_by_project_id_usecase(self, project_id: str) -> List[Receipt]:
        receipt = self.repo.get_receipts_by_project_id(project_id)
        if not receipt:
            raise HTTPException(status_code=404, detail="No receipts found for this project")

        return receipt

    def get_receipt_by_id_usecase(self, receipt_id: str) -> Receipt:
        if not receipt_id:
            raise HTTPException(status_code=400, detail="Receipt id is required")

        receipt = self.repo.get_receipt_by_id(receipt_id)
        if not receipt:
            raise HTTPException(status_code=404, detail="No receipt found with this id")

        return receipt

    def update_receipt_usecase(
        self, receipt_id: str, updates: ReceiptUpdate
    ) -> ReceiptResponse:
        return self.repo.update_receipt(receipt_id, updates)

    def delete_receipt_usecase(self, receipt_id: str) -> bool:
        return self.repo.delete_receipt(receipt_id)
