"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

export default function ChangeStoreModal() {
  const { closeChangeItemModal } = useModalStore();
  const { addItem } = usePurchaseStore();
  const { items, editingIndex, editItem, setEditingIndex } = usePurchaseStore();

  const itemToEdit = editingIndex !== null ? items[editingIndex] : null;

  const [itemName, setItemName] = useState(itemToEdit?.itemName || "");
  const [quantity, setQuantity] = useState(
    itemToEdit?.quantity.toString() || "1",
  );
  const [price, setPrice] = useState(itemToEdit?.price.toString() || "0.00");

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.itemName);
      setQuantity(itemToEdit.quantity.toString());
      setPrice(itemToEdit.price.toString());
    }
  }, [itemToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      editItem(editingIndex, {
        itemName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
    }
    closeChangeItemModal?.();
    setEditingIndex(null);
  };

  return (
    <DialogContent className="bg-[#FBF5F3] text-[#1B1212] rounded-[12px]">
      <DialogTitle>Edit Item</DialogTitle>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          required
        />
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </DialogContent>
  );
}
