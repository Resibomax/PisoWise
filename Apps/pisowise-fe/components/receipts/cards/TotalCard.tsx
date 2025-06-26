"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";

interface ItemsCardProps {
  receiptId: string;
}

export default function ItemsCard({ receiptId }: ItemsCardProps) {
  const { getReceiptById } = useReceiptStore();
  const receipt = getReceiptById(receiptId);

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
      </div>
    );
  }

  const subtotal = receipt.items.reduce(
    (acc, item) => acc + (item.price / 1.12) * item.quantity,
    0
  );

  const total = receipt.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
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
