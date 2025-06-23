import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Card className="bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[12px] text-white">
      <CardContent className="p-5 flex flex-col gap-[20px]">
        <div className="flex-shrink-0">
          <p className="font-[Ember] text-[24px]">
            Items ({receipt.totalItems})
          </p>
        </div>
        <div>
          {receipt.items.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex items-start justify-between">
                <div className="mb-2">
                  <p className="font-roboto-bld text-[14px] ">{item.name}</p>
                  <p className="font-roboto-light text-[14px] text-[#8B8483]">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-roboto-bld text-[14px]">
                  {" "}
                  ₱{item.price.toLocaleString()}
                </p>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
