"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Receipt } from "@/app/store/project/receipt-store";
import { usePurchaseStore } from "@/app/store/receiptDetails/purchaseStore";
import { useModalStore } from "@/app/store/project/modal-store";

interface ItemsCardProps {
  receipt: Receipt;
}

export default function ItemsCard({ receipt }: ItemsCardProps) {
  const isInEditMode = useModalStore((state) => state.isInEditMode);
  const items = usePurchaseStore((state) => state.items);

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
      </div>
    );
  }

  const itemsToUse = isInEditMode
    ? items.map((item) => ({
      unit_price: item.price,
      quantity: item.quantity,
    }))
    : receipt.items;

  const subtotal = itemsToUse.reduce(
    (acc, item) => acc + (item.unit_price / 1.12) * item.quantity,
    0,
  );

  const total = itemsToUse.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0,
  );

  const tax = total - subtotal;

  return (
    <Card className="mb-4 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px]">
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="hidden md:flex flex-col items-start">
          <h1 className="text-2xl font-roboto-bld">Summary</h1>
        </CardHeader>
        <div className="space-y-2 font-roboto-light text-[14px]">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax (12%)</span>
            <span>₱{tax.toFixed(2)}</span>
          </div>
          <hr className="mt-4 mb-2 border-t border-[#349868]" />
          <div className="flex items-center justify-between text-[16px] font-roboto-bld">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
