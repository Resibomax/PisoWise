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
    <Card className="m-3 mt-0 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px]">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-lg font-roboto-bld">Purchase Details</h2>
        </CardHeader>

        <div className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          <span>{storeName || "No store added"}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <span>{date || "No date selected"}</span>
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
