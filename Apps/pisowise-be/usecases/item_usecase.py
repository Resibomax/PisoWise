from sqlalchemy.orm import Session
from fastapi import HTTPException
from repositories.item_repository import ItemRepository
from repositories.receipt_repository import ReceiptRepository
from models.base import Item
from models.item import ItemCreate, ItemUpdate, ItemResponse
from typing import List

class ItemUseCase:
    def __init__(self, db: Session):
        self.repo = ItemRepository(db)
        self.receipt_repo = ReceiptRepository(db)

    def create_item_usecase(self, item: ItemCreate) -> ItemResponse:
        receipt = self.receipt_repo.get_receipt_by_id(item.receipt_id)
        if not receipt:
            raise HTTPException(status_code=404, detail="Invalid receipt_id: No matching receipt found.")

        calculated_total = item.quantity * item.unit_price

        new_item = self.repo.create_item(item, total_price=calculated_total)

        # Recalculate Receipt total_amount
        self.receipt_repo.calculate_receipt_total(receipt)

        return ItemResponse.model_validate(new_item)
    
    def get_all_items_usecase(self) -> List[ItemResponse]:
        items = self.repo.get_all_items()
        return [ItemResponse.model_validate(i) for i in items]

    def get_items_by_receipt_id_usecase(self, receipt_id: str) -> List[ItemResponse]:
        items = self.repo.get_items_by_receipt_id(receipt_id)
        if not items:
            raise HTTPException(status_code=404, detail=f"No items found in receipt {receipt_id}")
        return [ItemResponse.model_validate(i) for i in items]

    def update_item_usecase(self, item_id: str, updates: ItemUpdate) -> ItemResponse:
        # Get existing item
        existing_item = self.repo.get_item_by_id(item_id)
        if not existing_item:
            raise HTTPException(status_code=404, detail=f"Item with id {item_id} not found")

        update_data = updates.model_dump(exclude_unset=True)

        # Determine the new values
        quantity = update_data.get("quantity", existing_item.quantity)
        unit_price = update_data.get("unit_price", existing_item.unit_price)

        # Recalculate Item total_price
        update_data["total_price"] = quantity * unit_price

        # Update Item
        updated_item = self.repo.update_item(item_id, ItemUpdate(**update_data))

        # Recalculate Receipt total_amount
        receipt = self.receipt_repo.get_receipt_by_id(existing_item.receipt_id)
        self.receipt_repo.calculate_receipt_total(receipt)

        return ItemResponse.model_validate(updated_item)

    def delete_item_usecase(self, item_id: str) -> bool:
        existing_item = self.repo.get_item_by_id(item_id)
        if not existing_item:
            raise HTTPException(status_code=404, detail="Item not found")

        deleted_item = self.repo.delete_item(item_id)

        # Recalculate Receipt total_amount
        receipt = self.receipt_repo.get_receipt_by_id(existing_item.receipt_id)
        self.receipt_repo.calculate_receipt_total(receipt)

        return deleted_item
