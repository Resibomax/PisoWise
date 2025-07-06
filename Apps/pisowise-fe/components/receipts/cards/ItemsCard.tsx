import { useEffect } from "react";
import { useModalStore } from "@/app/store/project/modal-store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2, PlusSquare, MinusSquare } from "lucide-react";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { Button } from "@/components/ui/button";
import type { Receipt } from "@/app/store/project/receipt-store";

interface ItemsCardProps {
  receipt: Receipt;
}

export default function ItemsCard({ receipt }: ItemsCardProps) {
  const isInEditMode = useModalStore((state) => state.isInEditMode);
  const {
    items,
    clear,
    updateItemQuantity,
    removeItem,
    setEditingIndex,
    initializeFromReceipt,
  } = usePurchaseStore();

  const { openAddItemModal, openChangeItemModal } = useModalStore();

  useEffect(() => {
    if (isInEditMode && receipt) {
      initializeFromReceipt(receipt);
    }
  }, [isInEditMode, receipt, initializeFromReceipt]);

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
      </div>
    );
  }

  const itemsToRender = isInEditMode ? items : receipt.items;

  return (
    <Card className="p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px] md:h-[480px] h-auto flex flex-col">
      <CardHeader className="flex flex-col items-start mb-4">
        <h2 className="text-lg font-roboto-bld">
          Items ({itemsToRender.length})
        </h2>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {itemsToRender.length === 0 ? (
          <div className="hidden justify-center items-center bg-[#123524] rounded-[12px] h-full md:flex">
            <p className="text-[#49C187]">No items added</p>
          </div>
        ) : (
          itemsToRender.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between text-sm bg-[#1B1212]"
            >
              <div className="flex justify-between items-center text-[#8B8483] font-roboto-bld text-[20px] mb-1">
                <span>#{index + 1}</span>
                {isInEditMode && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        openChangeItemModal?.();
                      }}
                    >
                      <Pencil className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={() => removeItem(index)}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-between items-center font-roboto-bld">
                <span>
                  {isInEditMode
                    ? item.item_name
                    : (item.item_name ?? "Unnamed item")}
                </span>
                <span>
                  ₱
                  {(
                    (isInEditMode ? item.unit_price : item.unit_price) *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>

              {isInEditMode ? (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[#C4C4C4]">Qty:</span>
                  <button
                    onClick={() =>
                      updateItemQuantity(index, Math.max(1, item.quantity - 1))
                    }
                  >
                    <MinusSquare className="w-5 h-5 text-white cursor-pointer" />
                  </button>
                  <span className="text-[#49C187] font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateItemQuantity(index, item.quantity + 1)}
                  >
                    <PlusSquare className="w-5 h-5 text-white cursor-pointer" />
                  </button>
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
