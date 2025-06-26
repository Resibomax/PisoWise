"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Calendar as CalendarIcon } from "lucide-react";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptsDetails/purchaseStore";

export default function PurchaseDetailsCard() {
  const { openAddStoreModal, openAddDateModal } = useModalStore();
  const { storeName, date } = usePurchaseStore();

  return (
    <Card className="mb-4 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px]">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-lg font-roboto-bld">Purchase Details</h2>
        </CardHeader>

        <div className="hidden justify-center items-center bg-[#123524] rounded-[12px] h-[300px] md:flex">
          <p className="text-[#49C187]">Adding Manually</p>
        </div>

        <div className="flex flex-col space-y-2 font-roboto-light text-[14px] md:flex-row md:items-center md:justify-center lg:justify-between">
          <div className="flex items-center gap-2 h-6">
            <Store className="h-5 w-5 shrink-0" />
            <span className="leading-none">
              {storeName || "No store added"}
            </span>
          </div>
          <div className="flex items-center gap-2 h-6">
            <CalendarIcon className="h-5 w-5 shrink-0" />
            <span className="leading-none">{date || "No date selected"}</span>
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
