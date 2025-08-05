from sqlalchemy.orm import Session
from models.base import Receipt, Item
from models.receipt import ReceiptCreate, ReceiptUpdate, ReceiptResponse
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

    def clear_receipt_items(self, receipt_id: str) -> Receipt:
        receipt = (
            self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()
        )

        if not receipt:
            raise ValueError(f"Receipt with id {receipt_id} not found")

        for item in receipt.items:
            self.db.delete(item)

        self.db.commit()
        self.db.refresh(receipt)
        return receipt

    def add_item_to_receipt(
        self, receipt: Receipt, item_data: ReceiptUpdate
    ) -> Receipt:
        update_data = item_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            if field == "items":
                for itemData in value:
                    total_price = itemData["quantity"] * itemData["unit_price"]
                    new_item = Item(
                        item_name=itemData["item_name"],
                        quantity=itemData["quantity"],
                        unit_price=itemData["unit_price"],
                        total_price=total_price,
                        receipt=receipt,
                    )
                    self.db.add(new_item)

        self.db.commit()
        self.db.refresh(receipt)
        return receipt

    def calculate_receipt_total(self, receipt: Receipt) -> Receipt:
        total_amount = 0.0
        for item in receipt.items:
            total_amount += item.quantity * item.unit_price

        receipt.total_amount = total_amount

        self.db.commit()
        self.db.refresh(receipt)
        return total_amount

    def update_receipt_fields(
        self, receipt: ReceiptResponse, update_data: ReceiptUpdate
    ) -> ReceiptResponse:
        updateData = update_data.model_dump(exclude_unset=True)

        for field, value in updateData.items():
            if field == "items":
                continue
            setattr(receipt, field, value)

        self.db.commit()
        self.db.refresh(receipt)
        return receipt

    def delete_receipt(self, receipt_id: str) -> bool:
        receipt = (
            self.db.query(Receipt).filter(Receipt.receipt_id == receipt_id).first()
        )
        if not receipt:
            return False

        self.db.delete(receipt)
        self.db.commit()
        return True
