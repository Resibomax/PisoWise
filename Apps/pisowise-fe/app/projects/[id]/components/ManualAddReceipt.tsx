"use client";

import { Button } from "@/components/ui/button";
import { Undo2, Plus } from "lucide-react";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { Dialog } from "@/components/ui/dialog";
import PurchaseDetailsCard from "@/app/projects/[id]/components/cards/PurchaseDetailsCard";
import ItemsCard from "../components/cards/ItemsCard";
import AddStoreModal from "@/app/projects/[id]/components/modals/AddStoreModal";
import AddDateModal from "@/app/projects/[id]/components/modals/AddDateModal";
import AddItemModal from "@/app/projects/[id]/components/modals/AddItemModal";
import ReceiptTotalCard from "@/app/projects/[id]/components/cards/ReceiptTotalCard";

export default function AddReceipt() {
  const { isAddStoreModalOpen, closeAddStoreModal } = useModalStore();
  const { isAddDateModalOpen, closeAddDateModal } = useModalStore();
  const { isAddItemModalOpen, closeAddItemModal } = useModalStore();
  const { closeAddReceiptPage, closeManualReceipt } = useModalStore();

  return (
    <div className="flex flex-col">
      {/*Header*/}
      <div>
        <div className="flex items-center justify-between">
          <Button
            className="flex gap-2 mb-4 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
            onClick={() => {
              closeManualReceipt?.();
              closeAddReceiptPage();
            }}
          >
            <Undo2 className="h-5 w-5" />
            <span className="font-roboto-regular text-[16px]">Back</span>
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center mb-4 text-white">
          <h1 className="text-2xl font-bold font-roboto-semibld">Receipt</h1>
          <Button
            className="flex bg-[#1B1212] font-Ember font-normal tracking-[0.48px]"
            onClick={() => {
              useModalStore.getState().setManualInput(false);
            }}
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
            className="flex flex-row bg-[#349868] text-[#FBF5F3] rounded-[12px] w-full"
            onClick={() => {}}
          >
            <Plus className="h-5 w-5" />
            <span className="text-[16px]">Create Receipt</span>
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
