"use client";

import { useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { Calendar } from "@/components/ui/calendar";

export default function AddDateModal() {
  const [storeDate, setStoreDate] = useState<Date | undefined>(undefined);
  const { closeAddDateModal } = useModalStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2025, 2, 27)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storeDate) {
      const formatted = storeDate.toISOString().split("T")[0];
      console.log("Selected Date:", formatted);
    }
    closeAddDateModal();
    setStoreDate(undefined);
  };

  return (
    <DialogContent className="bg-[#FBF5F3] text-[#1B1212] rounded-[12px]">
      <DialogTitle className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left ">
        Add Date
      </DialogTitle>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          defaultMonth={new Date(2025, 2)}
          className="w-full bg-transparent border-2 border-[#246A49] rounded-[6px]"
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
