"use client";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/app/store/project/modal-store";
import { useReceiptStore } from "@/app/store/project/receipt-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { useState } from "react";

export default function ChangeStoreModal() {
  const { closeChangeStoreModal, isInEditMode } = useModalStore();
  const { receipt } = useReceiptStore();
  const { setStoreName } = usePurchaseStore();

  const [storeName, setLocalStoreName] = useState(receipt?.vendor_name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If in edit mode, also update the purchase store
    if (isInEditMode) {
      setStoreName(storeName);
    }

    closeChangeStoreModal?.();
  };

  return (
    <DialogContent className="bg-[#FBF5F3] text-[#1B1212] rounded-[12px]">
      <DialogTitle className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left">
        Change Store
      </DialogTitle>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="mb-1.5">Name</p>
          <Input
            className="w-full bg-white"
            type="text"
            value={storeName}
            onChange={(e) => setLocalStoreName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <Button
            type="submit"
            className="bg-[#246A49] text-white text-[16px] font-normal font-Ember rounded-[12px]"
          >
            Done
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
