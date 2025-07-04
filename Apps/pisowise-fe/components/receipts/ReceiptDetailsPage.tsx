"use client";

import { useParams } from "next/navigation";
import { useModalStore } from "@/app/store/project/modal-store";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ItemsCard from "@/components/receipts/cards/ItemsCard";
import DetailsCard from "@/components/receipts/cards/PurchaseDetails";
import TotalCard from "@/components/receipts/cards/TotalCard";
import { ReceiptsHeader } from "@/components/receipts/Header";
import { Dialog } from "@/components/ui/dialog";
import ChangeStoreModal from "@/components/projects/details/modals/editReceipt/ChangeStoreModal";
import ChangeDateModal from "@/components/projects/details/modals/editReceipt/ChangeDateModal";
import ChangeItemModal from "@/components/projects/details/modals/editReceipt/ChangeItemModal";
import AddItemModal from "@/components/projects/details/modals/AddItemModal";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { useReceiptDetailsPage } from "../../app/hooks/use-receipts-page";
import { useEffect } from "react";

export default function ProjectReceiptDetailsPage() {
  const { id: projectId, receiptId } = useParams();
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;
  const receiptIdString = Array.isArray(receiptId) ? receiptId[0] : receiptId;

  const {
    receipt,
    isLoading,
    updateReceipt,
  } = useReceiptDetailsPage(receiptIdString);

  const isInEditMode = useModalStore((state) => state.isInEditMode);
  const { isChangeStoreModalOpen, closeChangeStoreModal } = useModalStore();
  const { isChangeDateModalOpen, closeChangeDateModal } = useModalStore();
  const { isChangeItemModalOpen, closeChangeItemModal } = useModalStore();
  const { isAddItemModalOpen, closeAddItemModal } = useModalStore();
  const toggleEditModeOff = useModalStore((state) => state.toggleEditModeOff);

  const { storeName, date, items, initializeFromReceipt } = usePurchaseStore();

  useEffect(() => {
    if (isInEditMode && receipt) {
      initializeFromReceipt(receipt);
    }
  }, [isInEditMode, receipt, initializeFromReceipt]);

  if (isLoading) {
    return (
      <div className="p-4 text-white">
        <h1>Loading Receipt...</h1>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="p-4 text-white">
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
      <ReceiptsHeader receipt={receipt} />
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
        <div className="lg:w-3/10">
          <DetailsCard receipt={receipt || ""} />
        </div>
        <div className="lg:w-4/10">
          <ItemsCard receipt={receipt || ""} />
        </div>
        <div className="lg:w-3/10">
          <TotalCard receipt={receipt || ""} />
          {isInEditMode && (
            <Button
              className="flex flex-row bg-[#349868] text-[#FBF5F3] rounded-[12px] w-full mt-4"
              onClick={() => {
                if (!receiptIdString) return;
                console.log("Items: ", items)

                updateReceipt(receiptIdString, {
                  vendor_name: storeName,
                  transaction_date: date,
                  items: items.map((item) => ({
                    item_name: item.itemName,
                    quantity: item.quantity,
                    unit_price: item.price,
                  })),
                });

                toggleEditModeOff();
              }}
            >
              <Check className="h-5 w-5" />
              <span className="text-[16px]">Save Edit</span>
            </Button>
          )}
        </div>
      </div>

      <Dialog
        open={isChangeStoreModalOpen}
        onOpenChange={closeChangeStoreModal}
      >
        <ChangeStoreModal />
      </Dialog>
      <Dialog open={isChangeDateModalOpen} onOpenChange={closeChangeDateModal}>
        <ChangeDateModal />
      </Dialog>
      <Dialog open={isChangeItemModalOpen} onOpenChange={closeChangeItemModal}>
        <ChangeItemModal />
      </Dialog>
      <Dialog open={isAddItemModalOpen} onOpenChange={closeAddItemModal}>
        <AddItemModal />
      </Dialog>
    </div>
  );
}

