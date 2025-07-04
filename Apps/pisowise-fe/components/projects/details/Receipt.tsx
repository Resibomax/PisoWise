"use client";

import { useReceiptStore } from "@/app/store/project/receipt-store";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface ReceiptProps {
  projectId: string;
}

export default function Receipt({ projectId }: ReceiptProps) {
  const { receipts, isLoading, error, getReceiptsByProjectId } = useReceiptStore();

  useEffect(() => {
    if (!receipts || receipts.length === 0) {
      console.log("Fetching receipts for project:", projectId);
      getReceiptsByProjectId(projectId);
    }
  }, [projectId, receipts, getReceiptsByProjectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">Loading receipts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-h-[220px] md:max-h-[240px] lg:max-h-[320px] xl:max-h-[320px] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-center h-32 text-center">
          <div>
            <p className="text-red-400 mb-2">Error: {error}</p>
            <button
              onClick={() => {
                getReceiptsByProjectId(projectId);
              }}
              className="text-white bg-[#349868] px-4 py-2 rounded hover:bg-[#49C187]"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!receipts || !Array.isArray(receipts) || receipts.length === 0) {
    return (
      <div className="max-h-[220px] md:max-h-[240px] lg:max-h-[320px] xl:max-h-[320px] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-center h-32">
          <p className="text-white">No receipts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[220px] md:max-h-[240px] lg:max-h-[320px] xl:max-h-[320px] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 px-3 lg:px-4">
        {receipts.map((receipt, index) => {
          console.log(`Rendering receipt ${index}:`, receipt);
          return (
            <Link
              key={receipt.receipt_id}
              href={`/projects/${projectId}/receipts/${receipt.receipt_id}`}
              className="block p-3 bg-transparent rounded-[12px] transition-colors border border-[#349868] "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-roboto-regular text-[16px] md:text-[18px]">
                    {receipt.vendor_name || "Unknown Store"}
                  </h3>
                  <p className="text-white font-roboto-light text-[12px] md:text-[14px]">
                    {receipt.vendor_name}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-white font-roboto-regular text-[16px] md:text-[20px]">
                    ₱{(receipt.total_amount || 0).toLocaleString()}
                  </p>
                  <div className="p-1 hover:bg-white hover:text-black rounded-[12px] transition-colors text-white ml-2">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
