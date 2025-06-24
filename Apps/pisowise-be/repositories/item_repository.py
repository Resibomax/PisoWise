from sqlalchemy.orm import Session
from typing import List
from models.base import Item  
from models.item import ItemCreate, ItemUpdate
from typing import Optional


class ItemRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_item(self, item: ItemCreate, total_price: float) -> Item:
        item_data = item.model_dump()
        item_data["total_price"] = total_price  
        item = Item(**item_data)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def get_all_items(self) -> List[Item]:
        return self.db.query(Item).all()
    
    def get_item_by_id(self, item_id: str) -> Optional[Item]:
        return self.db.query(Item).filter(Item.item_id == item_id).first()

    def get_items_by_receipt_id(self, receipt_id: str) -> List[Item]:
        return self.db.query(Item).filter(Item.receipt_id == receipt_id).all()

    def update_item(self, item_id: str, updates: ItemUpdate) -> Item:
        item = self.db.query(Item).filter(Item.item_id == item_id).first()

        if not item:
            raise ValueError(f"Item with id {item_id} not found")

        update_data = updates.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(item, field, value)

        self.db.commit()
        self.db.refresh(item)
        return item

    def delete_item(self, item_id: str) -> bool:
        item = self.db.query(Item).filter(Item.item_id == item_id).first()
        if item:
            self.db.delete(item)
            self.db.commit()
            return True
        return False
