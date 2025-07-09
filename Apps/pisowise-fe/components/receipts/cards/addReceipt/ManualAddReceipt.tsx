"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Undo2, Plus } from "lucide-react";
import { useModalStore } from "@/app/store/project/modal-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { Dialog } from "@/components/ui/dialog";
import PurchaseDetailsCard from "@/components/receipts/cards/addReceipt/PurchaseDetailsCard";
import ItemsCard from "@/components/receipts/cards/addReceipt/ItemsCard";
import ReceiptTotalCard from "@/components/receipts/cards/addReceipt/TotalCard";
import AddStoreModal from "@/components/projects/details/modals/AddStoreModal";
import AddDateModal from "@/components/projects/details/modals/AddDateModal";
import AddItemModal from "@/components/projects/details/modals/AddItemModal";

export default function AddReceipt() {
  const router = useRouter();
  const { id: projectId } = useParams();
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;

  const [isCreating, setIsCreating] = useState(false);

  const { isAddStoreModalOpen, closeAddStoreModal } = useModalStore();
  const { isAddDateModalOpen, closeAddDateModal } = useModalStore();
  const { isAddItemModalOpen, closeAddItemModal } = useModalStore();
  const { closeAddReceiptPage, closeManualReceipt } = useModalStore();

  const { vendor_name, transaction_date, items, createNewReceipt, clear } =
    usePurchaseStore();

  const handleCreateReceipt = async () => {
    if (!projectIdString) {
      alert("Project ID not found");
      return;
    }

    // Validation
    if (!vendor_name || !transaction_date || items.length === 0) {
      alert(
        "Please fill in all required fields:\n- Vendor name\n- Transaction date\n- At least one item",
      );
      return;
    }

    setIsCreating(true);
    try {
      const newReceipt = await createNewReceipt(projectIdString);

      if (newReceipt) {
        console.log("Receipt created successfully:", newReceipt);

        // Close modals and navigate
        closeManualReceipt?.();
        closeAddReceiptPage();

        // Navigate to the new receipt details page
        router.push(
          `/projects/${projectIdString}/receipts/${newReceipt.receipt_id}`,
        );
      } else {
        alert("Failed to create receipt. Please try again.");
      }
    } catch (error) {
      console.error("Error creating receipt:", error);
      alert("Failed to create receipt. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    // Clear the purchase store data
    clear();

    // Close modals
    closeManualReceipt?.();
    closeAddReceiptPage();
    useModalStore.getState().setManualInput(false);
  };

  return (
    <div className="flex flex-col">
      {/*Header*/}
      <div>
        <div className="flex items-center justify-between">
          <Button
            className="flex gap-2 mb-4 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
            onClick={handleCancel}
          >
            <Undo2 className="h-5 w-5" />
            <span className="font-roboto-regular text-[16px]">Back</span>
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center mb-4 text-white">
          <h1 className="text-2xl font-bold font-roboto-semibld">Receipt</h1>
          <Button
            className="flex bg-[#1B1212]  font-roboto-light rounded-[12px] hover:bg-white hover:text-black tracking-[0.48px]"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
        <div className="lg:w-3/10">
          <PurchaseDetailsCard />
        </div>
        <div className="lg:w-4/10">
          <ItemsCard />
        </div>
        <div className="lg:w-3/10">
          <ReceiptTotalCard />
          <Button
            className="flex flex-row bg-[#349868] hover:bg-[#49C187] rounded-[12px] font-roboto-regular w-full mt-4"
            onClick={handleCreateReceipt}
            disabled={
              isCreating ||
              !vendor_name ||
              !transaction_date ||
              items.length === 0
            }
          >
            <Plus className="h-5 w-5" />
            <span className="text-[16px]">
              {isCreating ? "Creating..." : "Create Receipt"}
            </span>
          </Button>
        </div>
      </div>

      <Dialog open={isAddStoreModalOpen} onOpenChange={closeAddStoreModal}>
        <AddStoreModal />
      </Dialog>
      <Dialog open={isAddDateModalOpen} onOpenChange={closeAddDateModal}>
        <AddDateModal />
      </Dialog>
      <Dialog open={isAddItemModalOpen} onOpenChange={closeAddItemModal}>
        <AddItemModal />
      </Dialog>
    </div>
  );
}
