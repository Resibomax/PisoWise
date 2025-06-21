"use client";

import { Plus, Pen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Receipt from "../Receipt";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import { useState } from "react";
import EditReceipt from "../EditReceipt";

interface ReceiptsCardProps {
  title: string;
  projectId: string;
}

export default function ReceiptsCard({ title, projectId }: ReceiptsCardProps) {
  const { getReceiptsByProjectId } = useReceiptStore();
  const receipts = getReceiptsByProjectId(projectId);
  const hasReceipts = receipts.length > 0;

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        "bg-[#1B1212] border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-[Ember] text-[24px] text-white">Receipts</p>
          {isEditing ? (
            <Button
              className="flex gap-2 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
              onClick={() => setIsEditing(false)}
            >
              <Undo2 className="cursor-pointer h-5 w-5" />
            </Button>
          ) : hasReceipts ? (
            <Pen
              className="h-6 w-6 text-white"
              onClick={() => setIsEditing(!isEditing)}
            />
          ) : (
            <Plus className="h-6 w-6 text-white" />
          )}
        </div>
        <p className="text-white font-roboto-light text-[14px]">
          All Receipts for {title}
        </p>
        <div className="mt-4">
          {isEditing ? (
            <div className="text-white space-y-2">
              <EditReceipt projectId={projectId} />
              <Button className="text-white bg-[#349868] w-full rounded-[12px]">
                Add Receipt
              </Button>
            </div>
          ) : hasReceipts ? (
            <Receipt projectId={projectId} />
          ) : (
            <div className="flex items-center justify-center text-[#49C187]">
              <Button className="text-[#49C187] bg-[#123524] w-full">
                No Receipts
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
