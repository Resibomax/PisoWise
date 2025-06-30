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
        receipt = self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()

        if not receipt:
            raise ValueError(f"Receipt with id {receipt_id} not found")

        update_data = updates.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            if field == "items":
                # Delete existing items instead of clearing
                for item in receipt.items:
                    self.db.delete(item)
                self.db.flush()  # Apply deletions before adding new ones

                for item_data in value:
                    new_item = Item(
                        item_name=item_data["item_name"],
                        quantity=item_data["quantity"],
                        unit_price=item_data["unit_price"],
                        total_price=item_data["quantity"] * item_data["unit_price"],
                        receipt=receipt  # Use relationship
                    )
                    self.db.add(new_item)
            else:
                setattr(receipt, field, value)

        self.db.commit()
        self.db.refresh(receipt)
        return receipt

    def delete_receipt(self, receipt_id: str) -> bool:
        receipt = (
            self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()
        )
        if receipt:
            self.db.delete(receipt)
            self.db.commit()
            return True
        return False
