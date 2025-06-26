import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2, PlusSquare, MinusSquare } from "lucide-react";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import ChangeItemModal from "@/components/projects/details/modals/editReceipt/ChangeItemModal";

interface ItemsCardProps {
  receiptId: string;
}

export default function ItemsCard({ receiptId }: ItemsCardProps) {
  const { getReceiptById } = useReceiptStore();
  const receipt = getReceiptById(receiptId);
  const isInEditMode = useModalStore((state) => state.isInEditMode);
  const { openAddItemModal, openChangeItemModal, closeChangeItemModal, isChangeItemModalOpen } = useModalStore();
  const { items, clear } = usePurchaseStore();

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <Card className="p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px] md:h-[480px] h-auto flex flex-col">
      {/* Header */}
      <CardHeader className="flex flex-col items-start mb-4">
        <h2 className="text-lg font-roboto-bld">
          Items ({receipt.items.length})
        </h2>
      </CardHeader>

      {/* Scrollable Items List */}
      <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {receipt.items.length === 0 ? (
          <div className="hidden justify-center items-center bg-[#123524] rounded-[12px] h-full md:flex">
            <p className="text-[#49C187]">No items added</p>
          </div>
        ) : (
          receipt.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between text-sm bg-[#1B1212]"
            >
              {/* Top Row: Index and Action Icons */}
              <div className="flex justify-between items-center text-[#8B8483] font-roboto-bld text-[20px] mb-1">
                <span>#{index + 1}</span>
                {isInEditMode && (
                  <div className="flex space-x-2">
                    <button  onClick={openChangeItemModal}>
                      <Pencil className="w-5 h-5 text-white" />
                    </button>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>

              {/* Item Name and Price */}
              <div className="flex flex-row justify-between items-center font-roboto-bld">
                <span>{item.name}</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>

              {/* Quantity Controls */}
              {isInEditMode ? (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[#C4C4C4]">Qty:</span>
                  <MinusSquare className="w-5 h-5 text-white cursor-pointer" />
                  <span className="text-[#49C187] font-bold">
                    {item.quantity}
                  </span>
                  <PlusSquare className="w-5 h-5 text-white cursor-pointer" />
                </div>
              ) : (
                <span className="font-roboto-light text-[#C4C4C4]">
                  Qty: {item.quantity}
                </span>
              )}

              <hr className="mt-4 mb-2 border-t border-[#349868]" />
            </div>
          ))
        )}
      </CardContent>

      {/* Action Buttons (outside scroll) */}
      {isInEditMode && (
        <div className="flex flex-row gap-2 justify-end mt-4">
          <Button
            className="border border-[#349868] bg-transparent"
            onClick={clear}
          >
            Reset
          </Button>
          <Button className="bg-[#349868]" onClick={openAddItemModal}>
            Add Item
          </Button>
        </div>
      )}
    </Card>
  );
}
