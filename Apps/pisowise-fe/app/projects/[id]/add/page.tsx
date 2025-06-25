"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <div className="flex flex-col mt-2">
      {/*Header*/}
      <div className="flex items-center justify-between">
        <Button className="flex gap-2 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white">
          <Undo2 className="h-5 w-5" />
          <span className="font-roboto-regular text-[16px]">Back</span>
        </Button>
      </div>
      <div className="flex flex-row justify-between items-center p-2 text-white m-2">
        <h1 className="text-2xl font-bold font-roboto-regular">Receipt</h1>
        <Button className="flex bg-[#1B1212] font-Ember font-normal tracking-[0.48px]">
          Cancel
        </Button>
      </div>

      <PurchaseDetailsCard />
      <ItemsCard />
      <ReceiptTotalCard />

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
