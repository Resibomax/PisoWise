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
    <div className="max-h-[220px] md:max-h-[240px] lg:max-h-[320px] xl:max-h-[320px] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 px-3 lg:px-4">
        {receipts.map((receipt) => (
          <Link
            key={receipt.id}
            href={`/projects/${projectId}/receipts/${receipt.id}`}
            className="block p-3 bg-transparent rounded-[12px]  transition-colors border border-[#349868]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-roboto-regular text-[16px] md:text-[18px]">
                  {receipt.title}
                </h3>
                <p className="text-white font-roboto-light text-[12px] md:text-[14px]">
                  {receipt.totalItems} Items
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-white font-roboto-regular text-[16px] md:text-[20px]">
                  ₱{receipt.totalAmount.toLocaleString()}
                </p>
                <div className="p-1 hover:bg-white hover:text-black rounded-[12px] transition-color text-white ml-2">
                  <ChevronRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
