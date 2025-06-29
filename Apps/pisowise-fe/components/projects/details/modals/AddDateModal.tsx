"use client";

import { useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/modal-store";
import { Calendar } from "@/components/ui/calendar";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

export default function AddDateModal() {
  const { closeAddDateModal } = useModalStore();
  const { setDate } = usePurchaseStore();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setDate(formatted);
      console.log("Selected Date:", formatted);
    }
    closeAddDateModal();
    setSelectedDate(new Date());
  };

  return (
    <DialogContent className="bg-[#FBF5F3] text-[#1B1212] rounded-[12px]">
      <DialogTitle className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left">
        Add Date
      </DialogTitle>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          defaultMonth={new Date()}
          className="w-full bg-transparent border-2 border-[#246A49] rounded-[6px]"
          required
        />

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
