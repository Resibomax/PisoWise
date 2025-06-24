import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { useReceiptEditStore } from "@/app/store/receipts/receiptEdit";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PurchaseDeetsProps {
  receiptId: string;
  isEditMode?: boolean;
}

export default function TotalCard({
  receiptId,
  isEditMode = false,
}: PurchaseDeetsProps) {
  const { getReceiptById } = useReceiptStore();
  const { getEditTotals } = useReceiptEditStore();
  const receipt = getReceiptById(receiptId);

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
      </div>
    );
  }

  const { totalAmount } = isEditMode
    ? getEditTotals(receiptId)
    : { totalAmount: receipt.totalAmount };

  const tax = receipt.tax || 0;
  const Total = tax + totalAmount;

  return (
    <Card className="bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[12px] text-white h-fit w-full">
      <CardContent className="p-5 flex flex-col font-roboto-light text-[14px]">
        <p className="font-[Ember] text-[24px] mb-2">Summary</p>
        <div className="flex items-center gap-2 justify-between">
          <p>Subtotal</p>
          <p>₱ {totalAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p>Tax</p>
          <p>₱ {tax.toLocaleString()}</p>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center gap-2 justify-between font-roboto-bld text-[18px]">
          <p>Total</p>
          <p>₱ {Total.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
