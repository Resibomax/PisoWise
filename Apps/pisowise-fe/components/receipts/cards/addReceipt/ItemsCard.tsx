"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/modal-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";

export default function ItemsCard() {
  const { openAddItemModal } = useModalStore();
  const { items, clear } = usePurchaseStore();

  return (
    <Card className="mb-4 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px] md:h-[480px] h-auto flex flex-col">
      <CardHeader className="flex flex-col items-start mb-4">
        <h2 className="text-lg font-roboto-bld">Items ({items.length})</h2>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {items.length === 0 ? (
          <div className="hidden justify-center items-center bg-[#123524] rounded-[12px] h-full md:flex">
            <p className="text-[#49C187]">No items added</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex flex-col justify-between text-sm">
              <span className="text-[20px] text-[#8B8483] font-roboto-bld mb-1 font-[Ember]">
                #{index + 1}
              </span>
              <div className="flex flex-row justify-between items-center font-roboto-bld">
                <span>{item.itemName}</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <span>Qty: {item.quantity}</span>
              <hr className="mt-4 mb-2 border-t border-[#349868]" />
            </div>
          ))
        )}
      </CardContent>

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
    </Card>
  );
}
