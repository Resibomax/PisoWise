"use client";

import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { Calendar, Store } from "lucide-react";
import Image from "next/image";
import { ImageModal } from "../modals/ImageModal";
import { Button } from "@/components/ui/button";

interface PurchaseDeetsProps {
  receiptId: string;
  isEditMode?: boolean;
}

export default function DetailsCard({
  receiptId,
  isEditMode = false,
}: PurchaseDeetsProps) {
  const { getReceiptById } = useReceiptStore();
  const receipt = getReceiptById(receiptId);
  const { openImageModal, openChangeStoreModal, openChangeDateModal } =
    useModalStore();
  const isInEditMode = useModalStore((state) => state.isInEditMode);
  const { storeName, date } = usePurchaseStore();

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
    <Card className="bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[12px] text-white w-full">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <p className="font-[Ember] text-[24px]">Purchase Details</p>
        </div>

        {/* Image or Placeholder */}
        <div className="flex-grow flex justify-center items-center mb-4">
          {receipt.receiptImage && receipt.receiptImage.trim() !== "" ? (
            <Image
              src={receipt.receiptImage || "/placeholder.svg"}
              alt="Receipt"
              width={150}
              height={150}
              className="rounded-[12px] shadow-md border-[#349868] border-3 lg:object-cover"
              onClick={openImageModal}
            />
          ) : (
            <div className="bg-[#123524] text-[#49C187] flex items-center justify-center p-2 rounded-[12px] h-full w-full">
              <p>Added manually</p>
            </div>
          )}
        </div>

        {/* Store and Date Details Layout */}
        {isInEditMode ? (
          <div className="flex flex-col justify-between items-start gap-4 mt-4 font-roboto-regular">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                <p className="text-sm">
                  {receipt.address || "No address provided"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <p className="text-sm">{receipt.date}</p>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <Button className="bg-[#349868]" onClick={openChangeStoreModal}>
                {receipt.address ? "Change Store" : "Add Store"}
              </Button>
              <Button className="bg-[#349868]" onClick={openChangeDateModal}>
                {receipt.date ? "Change Date" : "Add Date"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4 text-[14px] font-roboto-light">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <p className="text-sm">
                {receipt.address || "No address provided"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <p className="text-sm">{receipt.date}</p>
            </div>
          </div>
        )}
      </CardContent>

      {/* Image modal */}
      <ImageModal receiptId={receiptId} />
    </Card>
  );
}
