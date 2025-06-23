import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { Calendar, Store } from "lucide-react";
import Image from "next/image";
import { ImageModal } from "./ImageModal";

interface PurchaseDeetsProps {
  receiptId: string;
}

export default function DetailsCard({ receiptId }: PurchaseDeetsProps) {
  const { getReceiptById } = useReceiptStore();
  const receipt = getReceiptById(receiptId);
  const { openImageModal } = useModalStore();

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
    <Card className="bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[12px] text-white">
      <CardContent className="p-5 flex flex-col">
        <div className="flex-shrink-0 mb-4">
          <p className="font-[Ember] text-[18px]">Purchase Details</p>
        </div>

        {receipt.receiptImage && receipt.receiptImage.trim() !== "" ? (
          <div className="flex justify-center mb-4">
            <Image
              src={receipt.receiptImage || "/placeholder.svg"}
              alt="Receipt"
              width={60}
              height={60}
              className="rounded-[12px] shadow-md border-[#349868] border-2"
              onClick={openImageModal}
            />
          </div>
        ) : (
          <div className="flex justify-center mb-4 bg-[#123524] text-[#49C187] p-2 rounded-[12px]">
            <p>Added manually</p>
          </div>
        )}

        <div className="text-[14px] font-roboto-light space-y-3">
          <div className="flex items-start gap-2">
            <Store className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="break-words">{receipt.address}</p>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{receipt.date}</p>
          </div>
        </div>
      </CardContent>
      <ImageModal receiptId={receiptId} />
    </Card>
  );
}
