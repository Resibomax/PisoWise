"use client";

import { useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/project/modal-store";
import { Calendar } from "@/components/ui/calendar";
import { useReceiptStore } from "@/app/store/project/receipt-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

interface ChangeDateModalProps {
  receiptId: string;
}

export default function ChangeDateModal({ receiptId }: ChangeDateModalProps) {
  const { closeChangeDateModal, isInEditMode } = useModalStore();
  const { receipt } = useReceiptStore();
  const { setDate } = usePurchaseStore();

  const [selectedDate, setSelectedDate] = useState<Date>(
    receipt?.date ? new Date(receipt.date) : new Date(),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString("en-CA");

      // If in edit mode, also update the purchase store
      if (isInEditMode) {
        setDate(formatted);
      }
    }
    closeChangeDateModal?.();
  };

  return (
    <DialogContent className="bg-[#FBF5F3] text-[#1B1212] rounded-[12px]">
      <DialogTitle className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left">
        Change Date
      </DialogTitle>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          defaultMonth={new Date()}
          className="w-full bg-transparent border-2 border-[#246A49] rounded-[6px]"
        />

        <div className="flex flex-col gap-2 justify-end">
          <Button
            type="submit"
            className="bg-[#246A49] text-white text-[16px] font-normal font-Ember rounded-[12px]"
          >
            Save
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
