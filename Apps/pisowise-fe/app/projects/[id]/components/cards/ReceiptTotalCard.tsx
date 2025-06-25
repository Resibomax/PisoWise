"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { usePurchaseStore } from "@/app/store/receiptsDetails/purchaseStore";

export default function ItemsCard() {
  const { items } = usePurchaseStore();

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price / 1.12) * item.quantity,
    0
  );

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = total - subtotal;

  return (
    <Card className="m-3 mt-0 p-6 bg-[#1B1212] text-[#FBF5F3] rounded-[12px]">
      <CardContent className="flex flex-col gap-4">
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
