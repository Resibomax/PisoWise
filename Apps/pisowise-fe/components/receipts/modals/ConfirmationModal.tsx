"use client";

import { useModalStore } from "@/app/store/project/modal-store";
import { useReceiptStore } from "@/app/store/project/receipt-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ConfirmationModalProps {
  receiptId?: string;
}

export function ConfirmationModal({ receiptId }: ConfirmationModalProps) {
  const { isConfirmDeleteModalOpen, closeConfirmDeleteModal } = useModalStore();
  const router = useRouter();
  const { deleteReceipt } = useReceiptStore();

  const handleDelete = async () => {
    try {
      if (receiptId) {
        await deleteReceipt(receiptId);
        closeConfirmDeleteModal();
        router.push(`/projects/`);
      }
    } catch (error) {
      console.error("Error deleting receipt:", error);
    }
  };

  return (
    <Dialog
      open={isConfirmDeleteModalOpen}
      onOpenChange={closeConfirmDeleteModal}
    >
      <DialogContent className="sm:max-w-md bg-[#1B1212] text-white border-none">
        <DialogHeader className="text-left">
          <DialogTitle className="font-[Ember] text-[20px] md:text-[24px]">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="font-roboto-light text-[14px] md:text-[18px]">
            You are about to permanently delete this receipt. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row w-full justify-end">
          <Button
            className="bg-transparent border-white border-1 rounded-[12px] hover:bg-white hover:text-black"
            onClick={closeConfirmDeleteModal}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#E73648] rounded-[12px] hover:bg-[#EC5B69]"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
