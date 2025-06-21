"use client";

import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ReceiptProps {
  projectId: string;
}

export default function Receipt({ projectId }: ReceiptProps) {
  const { getReceiptsByProjectId } = useReceiptStore();
  const receipts = getReceiptsByProjectId(projectId);

  return (
    <div className="space-y-3">
      {receipts.map((receipt) => (
        <Link
          key={receipt.id}
          href={`/projects/${projectId}/receipts/${receipt.id}`}
          className="block p-3 bg-transparent rounded-lg  transition-colors border border-[#349868]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-roboto-regular text-[16px]">
                {receipt.title}
              </h3>
              <p className="text-white font-roboto-light text-[12px]">
                {receipt.totalItems} Items
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-white font-roboto-regular text-[16px]">
                ₱{receipt.totalAmount.toLocaleString()}
              </p>
              <ChevronRight className="h-4 w-4 text-white ml-2" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
