"use client";

import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
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
    <Card className="bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[12px] text-white w-full">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <p className="font-[Ember] text-[24px]">Purchase Details</p>
        </div>

        {/* Image */}
        <div className="flex-grow flex justify-center items-center mb-4">
          {receipt.receiptImage && receipt.receiptImage.trim() !== "" ? (
            <Image
              src={receipt.receiptImage || "/placeholder.svg"}
              alt="Receipt"
              width={150}
              height={150}
              className="rounded-[12px] shadow-md border-[#349868] border-3 lg:object-cover cursor-pointer"
              onClick={openImageModal}
            />
          ) : (
            <div className="bg-[#123524] text-[#49C187] flex items-center justify-center p-2 rounded-[12px] h-full w-full">
              <p>Added manually</p>
            </div>
          )}
        </div>

        {/* Address and Date */}
        <div className="lg:flex text-[14px] font-roboto-light space-y-3 lg:justify-center gap-10">
          <div className="flex items-start gap-2">
            <Store className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="break-words">
              {receipt.address || "No address provided"}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{receipt.date}</p>
          </div>
        </div>

        {/* Edit Mode Buttons */}
        {isEditMode && (
          <div className="flex gap-2 justify-end mt-4">
            <Button className="bg-[#349868] hover:bg-[#49C187] text-white h-auto rounded-[12px] font-[Ember]">
              Change Store
            </Button>
            <Button className="bg-[#349868] hover:bg-[#49C187] text-white h-auto rounded-[12px] font-[Ember]">
              Change Date
            </Button>
          </div>
        )}
      </CardContent>
      <ImageModal receiptId={receiptId} />
    </Card>
  );
}
