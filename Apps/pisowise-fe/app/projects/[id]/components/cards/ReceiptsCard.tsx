"use client";

import { Plus, Pen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Receipt from "../Receipt";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { useState } from "react";
import EditReceipt from "../EditReceipt";

interface ReceiptsCardProps {
  title: string;
  projectId: string;
}

export default function ReceiptsCard({ title, projectId }: ReceiptsCardProps) {
  const { getReceiptsByProjectId } = useReceiptStore();
  const { openAddReceiptPage } = useModalStore();
  const receipts = getReceiptsByProjectId(projectId);
  const hasReceipts = receipts.length > 0;

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        "bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow lg:h-[460px] flex flex-col",
      )}
    >
      <CardContent className="p-5 flex flex-col">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="font-[Ember] text-[24px] md:text-[30px] text-white">
              Receipts
            </p>
            {isEditing ? (
              <Button
                className="flex gap-2 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
                onClick={() => setIsEditing(false)}
              >
                <Undo2 className="cursor-pointer h-5 w-5" />
              </Button>
            ) : hasReceipts ? (
              <div
                className="p-1 hover:bg-white hover:text-black rounded-[12px] transition-color text-white cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Pen className="h-6 w-6" />
              </div>
            ) : (
              <div
                className="p-1 hover:bg-white hover:text-black rounded-[12px] transition-color text-white cursor-pointer"
                onClick={openAddReceiptPage}
              >
                <Plus className="h-6 w-6" />
              </div>
            )}
          </div>
          <p className="text-white font-roboto-light text-[14px] md:text-[18px] mt-2">
            All Receipts for {title}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="mt-4 flex-1 min-h-0">
          {isEditing ? (
            <div className="text-white space-y-2 h-full flex flex-col">
              <EditReceipt projectId={projectId} />

              <Button
                className="text-white bg-[#349868] w-full rounded-[12px] hover:bg-[#49C187] flex-shrink-0"
                onClick={openAddReceiptPage}
              >
                Add Receipt
              </Button>
            </div>
          ) : hasReceipts ? (
            <Receipt projectId={projectId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button
                className="text-[#49C187] bg-[#123524] w-full hover:bg-[#49C187] hover:text-black cursor-pointer lg:h-[320px]"
                onClick={openAddReceiptPage}
              >
                No Receipts
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
