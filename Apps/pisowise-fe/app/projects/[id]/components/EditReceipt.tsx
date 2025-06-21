"use client";

import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import Link from "next/link";
import { Trash } from "lucide-react";

interface ReceiptProps {
  projectId: string;
}

export default function EditReceipt({ projectId }: ReceiptProps) {
  const { getReceiptsByProjectId } = useReceiptStore();
  const receipts = getReceiptsByProjectId(projectId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {receipts.map((receipt) => (
        <Link
          key={receipt.id}
          href={`/projects/${projectId}/receipts/${receipt.id}`}
          className="block p-3 bg-transparent rounded-[12px] transition-colors border border-[#349868]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trash className="cursor-pointer h-5 w-5 text-[#E73648]" />
              <div>
                <h3 className="text-white font-roboto-regular text-[16px]">
                  {receipt.title}
                </h3>
                <p className="text-white font-roboto-light text-[12px]">
                  {receipt.totalItems} Items
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-white font-roboto-regular text-[16px]">
                ₱{receipt.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
