"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/app/store/project/modal-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

export default function ChangeStoreModal() {
  const { closeChangeItemModal } = useModalStore();
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
      <DialogTitle className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left">
        {editingIndex !== null ? `Edit Item ${editingIndex + 1}` : "Edit Item"}
      </DialogTitle>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            className="w-full bg-white"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="mb-1.5">Quantity</p>
          <Input
            className="w-full bg-white"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <Button
            type="submit"
            className="bg-[#246A49] text-white text-[16px] font-normal font-Ember rounded-[12px]"
            variant="outline"
          >
            Save
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
