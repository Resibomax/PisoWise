"use client";

import { useEffect } from "react";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { useReceiptEditStore } from "@/app/store/receipts/receiptEdit";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pen, SquarePlus, SquareMinus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ItemsCardProps {
  receiptId: string;
  isEditMode?: boolean;
}

export default function ItemsCard({
  receiptId,
  isEditMode = false,
}: ItemsCardProps) {
  const { getReceiptById } = useReceiptStore();
  const {
    setEditItems,
    handleQuantityChange,
    handleDeleteItem,
    handleAddItem,
    handleReset,
    getEditItems,
    getEditTotals,
    clearEditItems,
  } = useReceiptEditStore();

  const receipt = getReceiptById(receiptId);

  useEffect(() => {
    if (isEditMode && receipt?.items) {
      setEditItems(receiptId, receipt.items);
    } else {
      clearEditItems(receiptId);
    }
  }, [isEditMode, receipt?.items, receiptId, setEditItems, clearEditItems]);

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
      </div>
    );
  }

  const items = isEditMode ? getEditItems(receiptId) : receipt.items;
  const totalItems = isEditMode
    ? getEditTotals(receiptId).totalItems
    : receipt.totalItems;

  return (
    <Card className="bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[12px] text-white w-full">
      <CardContent className="p-5 flex flex-col">
        <div className="flex-shrink-0 mb-[20px]">
          <p className="font-[Ember] text-[24px]">Items ({totalItems})</p>
        </div>
        <div className="h-[230px] lg:h-[400px] overflow-y-auto custom-scrollbar px-2">
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex items-start justify-between">
                <div className="mb-2">
                  <p className="font-roboto-bld text-[14px]">{item.name}</p>
                  <div className="font-roboto-light text-[14px] text-[#8B8483]">
                    {isEditMode ? (
                      <div className="flex items-center mt-1">
                        <span className="mr-2">Qty:</span>
                        <Button
                          size="sm"
                          className="w-6 h-6"
                          onClick={() =>
                            handleQuantityChange(receiptId, item.id, -1)
                          }
                        >
                          <SquareMinus className="w-3 h-3" />
                        </Button>
                        <p className="w-8 text-center text-[#349868]">
                          {item.quantity}
                        </p>
                        <Button
                          size="sm"
                          className="w-6 h-6 p-0"
                          onClick={() =>
                            handleQuantityChange(receiptId, item.id, 1)
                          }
                        >
                          <SquarePlus className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      `Qty: ${item.quantity}`
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {isEditMode && (
                    <div className="flex">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 text-white"
                      >
                        <Pen className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 text-[#E73648] hover:text-[#E73648]"
                        onClick={() => handleDeleteItem(receiptId, item.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <p className="font-roboto-bld text-[14px]">
                    ₱{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>

        {isEditMode && (
          <div className="flex gap-3 mt-6 items-center justify-end">
            <Button
              className="bg-transparent border-1 border-white rounded-[12px] text-white hover:bg-white hover:text-black font-[Ember]"
              onClick={() => handleReset(receiptId, receipt.items)}
            >
              Reset
            </Button>
            <Button
              className="bg-[#349868] hover:bg-[#49C187] rounded-[12px] text-white font-[Ember]"
              onClick={() => handleAddItem(receiptId)}
            >
              Add Item
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
