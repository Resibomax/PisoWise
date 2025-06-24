"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { useReceiptEditStore } from "@/app/store/receipts/receiptEdit";
import ItemsCard from "@/components/receipts/cards/ItemsCard";
import { ReceiptsHeader } from "@/components/receipts/Header";
import DetailsCard from "@/components/receipts/cards/PurchaseDetails";
import TotalCard from "@/components/receipts/cards/TotalCard";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function ProjectReceiptDetailsPage() {
  const { id: projectId, receiptId } = useParams();
  const { getReceiptById } = useReceiptStore();
  const { saveChanges } = useReceiptEditStore();

  const [isEditMode, setIsEditMode] = useState(false);

  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;
  const receiptIdString = Array.isArray(receiptId) ? receiptId[0] : receiptId;
  const receipt = getReceiptById(receiptIdString || "");

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    saveChanges(receiptIdString || "");
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
        <a href={`/projects/${projectIdString}/receipts`}>
          Back to Project Receipts
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col p-4 md:px-8 lg:px-16 text-white gap-[20px]">
      <ReceiptsHeader
        receipt={receipt}
        onEdit={handleEdit}
        isEditMode={isEditMode}
        onCancel={handleCancel}
      />
      <div className="flex flex-col lg:flex-row gap-[20px]">
        <DetailsCard
          receiptId={receiptIdString || ""}
          isEditMode={isEditMode}
        />
        <ItemsCard receiptId={receiptIdString || ""} isEditMode={isEditMode} />
        <div className="flex flex-col gap-[20px] lg:w-full">
          <TotalCard
            receiptId={receiptIdString || ""}
            isEditMode={isEditMode}
          />
          {isEditMode && (
            <Button
              onClick={handleSave}
              className="w-full bg-[#349868] hover:bg-[#49C187] text-white font-medium rounded-[12px] font-[Ember]"
            >
              <Check className="h-5 w-5" />
              Save Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
