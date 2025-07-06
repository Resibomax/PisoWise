"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Calendar as CalendarIcon } from "lucide-react";
import { useModalStore } from "@/app/store/project/modal-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

export default function PurchaseDetailsCard() {
  const { openAddStoreModal, openAddDateModal } = useModalStore();
  const { vendor_name, transaction_date } = usePurchaseStore();

  return (
    <Card className="mb-4 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px]">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-lg font-roboto-bld">Purchase Details</h2>
        </CardHeader>

        <div className="hidden justify-center items-center bg-[#123524] rounded-[12px] h-[300px] md:flex">
          <p className="text-[#49C187]">Adding Manually</p>
        </div>

        <div className="flex flex-col font-roboto-light text-[14px] md:flex-row md:items-center md:justify-center lg:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 shrink-0" />
            <span className="inline-block align-middle leading-tight">
              {vendor_name || "No store added"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 shrink-0" />
            <span className="inline-block align-middle leading-tight">
              {transaction_date || "No date selected"}
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <Button className="bg-[#349868]" onClick={openAddStoreModal}>
            Add Store
          </Button>
          <Button className="bg-[#349868]" onClick={openAddDateModal}>
            Add Date
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
