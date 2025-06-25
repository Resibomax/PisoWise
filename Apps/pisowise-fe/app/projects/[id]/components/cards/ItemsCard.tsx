"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptsDetails/purchaseStore";

export default function ItemsCard() {
  const { openAddItemModal } = useModalStore();
  const { items, clear } = usePurchaseStore();

  return (
    <Card className="m-3 mt-0 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px]">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-lg font-roboto-bld">Items ({items.length})</h2>
        </CardHeader>

        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="text-sm italic text-[#aaa]">No items added.</p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between text-sm"
              >
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
        </div>

        <div className="flex flex-row gap-2 justify-end">
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
      </CardContent>
    </Card>
  );
}
