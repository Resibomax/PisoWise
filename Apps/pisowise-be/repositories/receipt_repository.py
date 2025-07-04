from sqlalchemy.orm import Session
from models.base import Receipt, Item
from models.receipt import ReceiptCreate, ReceiptUpdate
from typing import List

class ReceiptRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_receipt(self, receipt: ReceiptCreate) -> Receipt:
        receipt_data = receipt.model_dump()
        receipt = Receipt(**receipt_data)
        self.db.add(receipt)
        self.db.commit()
        self.db.refresh(receipt)
        return receipt

    def get_all_receipts(self) -> List[Receipt]:
        return self.db.query(Receipt).all()

    def get_receipts_by_project_id(self, project_id: str) -> List[Receipt]:
        return self.db.query(Receipt).filter(Receipt.project_id == project_id).all()
    
    def get_receipt_by_id(self, receipt_id: str) -> Receipt | None:
        return self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()

    def update_receipt(self, receipt_id: str, updates: ReceiptUpdate) -> Receipt:
        receipt = (
            self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()
        )

        if not receipt:
            raise ValueError(f"Receipt with id {receipt_id} not found")

        receipt_data_dict = updates.model_dump(exclude_unset=True)
        for field, value in receipt_data_dict.items():
            setattr(receipt, field, value)

        self.db.commit()
        self.db.refresh(receipt)

        return receipt

    def delete_receipt(self, receipt_id: str) -> bool:
        receipt = self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()
        if not receipt:
            return False
    
        self.db.query(Item).filter(Item.receipt_id == receipt_id).delete()
        self.db.delete(receipt)
        self.db.commit()
        return True

