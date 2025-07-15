"use client";

import { useReceiptStore } from "@/app/store/project/receipt-store";
import { Trash } from "lucide-react";
import { useEffect, useRef } from "react";

interface ReceiptProps {
  projectId: string;
}

export default function EditReceipt({ projectId }: ReceiptProps) {
  const { getReceiptsByProjectId, receipts, deleteReceipt } = useReceiptStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && (!receipts || receipts.length === 0)) {
      const fetchReceipts = async () => {
        await getReceiptsByProjectId(projectId);
        hasFetched.current = true;
      };
      fetchReceipts();
    }
  }, [projectId]);

  return (
    <div className="max-h-[220px] md:max-h-[240px] lg:max-h-[280px] xl:max-h-[280px] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 px-3 lg:px-4">
        {receipts?.map((receipt, index) => (
          <div
            key={receipt.receipt_id}
            className="block p-3 bg-transparent rounded-[12px] transition-colors border border-[#349868]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="p-2 hover:bg-white hover:text-black rounded-[12px] transition-color text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteReceipt(receipt.receipt_id);
                  }}
                >
                  <Trash className="cursor-pointer h-5 w-5 text-[#E73648]" />
                </div>
                <div>
                  <h3 className="text-white font-roboto-regular text-[16px] md:text-[18px]">
                    {"Receipt " + (index + 1)}
                  </h3>
                  <p className="text-white font-roboto-light text-[12px] md:text-[14px]">
                    {receipt.items?.length} Items
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-white font-roboto-regular text-[16px] md:text-[20px]">
                  ₱{receipt.total_amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
