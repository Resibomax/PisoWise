"use client";

import { useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptsDetails/purchaseStore";

export default function AddStoreModal() {
  const { closeAddItemModal } = useModalStore();
  const { addItem } = usePurchaseStore(); 

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addItem({
      itemName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });

    closeAddItemModal?.();
    setItemName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <DialogContent className="bg-[#FBF5F3] text-[#1B1212] rounded-[12px]">
      <DialogTitle className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left">
        Add Store
      </DialogTitle>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="mb-1.5">Name</p>
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

        <div>
          <p className="mb-1.5">Price (₱)</p>
          <Input
            className="w-full bg-white"
            type="number"
            step="0.01"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
