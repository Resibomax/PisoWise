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
        return self.repo.get_receipts_by_project_id(project_id)

    def update_receipt_usecase(
        self, receipt_id: str, updates: ReceiptUpdate
    ) -> ReceiptResponse:
        return self.repo.update_receipt(receipt_id, updates)

    def delete_receipt_usecase(self, receipt_id: str) -> bool:
        return self.repo.delete_receipt(receipt_id)
