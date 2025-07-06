"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/app/store/project/modal-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { Calendar, Store } from "lucide-react";
import Image from "next/image";
import { ImageModal } from "../modals/ImageModal";
import { Button } from "@/components/ui/button";
import type { Receipt } from "@/app/store/project/receipt-store";

interface PurchaseDeetsProps {
  receipt: Receipt;
  isEditMode?: boolean;
}

export default function DetailsCard({ receipt }: PurchaseDeetsProps) {
  const { openImageModal, openChangeStoreModal, openChangeDateModal } =
    useModalStore();
  const isInEditMode = useModalStore((state) => state.isInEditMode);
  const { vendor_name, transaction_date } = usePurchaseStore();

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
                  {vendor_name || "No address provided"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <p className="text-sm">
                  {transaction_date || "No date provided"}
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-2 justify-end w-full">
              <Button className="bg-[#349868]" onClick={openChangeStoreModal}>
                {vendor_name ? "Change Store" : "Add Store"}
              </Button>
              <Button className="bg-[#349868]" onClick={openChangeDateModal}>
                {transaction_date ? "Change Date" : "Add Date"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4 text-[14px] font-roboto-light">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <p className="text-sm">
                {receipt.vendor_name || "No address provided"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <p className="text-sm">{receipt.transaction_date}</p>
            </div>
          </div>
        )}
      </CardContent>

      {/* Image modal */}
      <ImageModal receipt={receipt} />
    </Card>
  );
}
