"use client";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

export default function AddStoreModal() {
  const { closeChangeStoreModal } = useModalStore();
  const { storeName, setStoreName } = usePurchaseStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Store name:", storeName);
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
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <Button
            type="submit"
            className="bg-[#246A49] text-white text-[16px] font-normal font-Ember rounded-[12px]"
            variant="outline"
          >
            Done
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
