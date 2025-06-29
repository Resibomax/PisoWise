import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { useModalStore } from "@/app/store/modal-store";
import Image from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ImageModalProps {
  receiptId: string;
}

export function ImageModal({ receiptId }: ImageModalProps) {
  const { isImageModalOpen, closeImageModal } = useModalStore();
  const { getReceiptById } = useReceiptStore();
  const receipt = getReceiptById(receiptId);

  if (!receipt) {
    return (
      <Card className="bg-[#1B1212] border-none shadow-lg rounded-[12px] text-white">
        <CardContent className="p-5 text-center">
          <h1 className="text-lg font-semibold mb-2">Receipt Not Found</h1>
          <p className="text-gray-400">
            The receipt you are looking for does not exist.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isImageModalOpen} onOpenChange={closeImageModal}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-md bg-transparent shadow-none text-white border-none flex items-center justify-center">
        <Image
          src={receipt.receiptImage || "/placeholder.svg"}
          alt="Receipt"
          width={400}
          height={400}
          className="rounded-[12px] shadow-md border-[#349868] border-3 mt-6 max-h-[550px]"
        />
      </DialogContent>
    </Dialog>
  );
}
