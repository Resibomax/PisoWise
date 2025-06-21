"use client";

import { Plus, Pen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Receipt from "./Receipt";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";

interface ReceiptsCardProps {
  title: string;
  projectId: string;
}

export default function ReceiptsCard({ title, projectId }: ReceiptsCardProps) {
  const { getReceiptsByProjectId } = useReceiptStore();
  const receipts = getReceiptsByProjectId(projectId);
  const hasReceipts = receipts.length > 0;

  return (
    <Card
      className={cn(
        "bg-[#1B1212] border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow",
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-[Ember] text-[24px] text-white">Receipts</p>
          {hasReceipts ? (
            <Pen className="h-6 w-6 text-white" />
          ) : (
            <Plus className="h-6 w-6 text-white" />
          )}
        </div>
        <p className="text-white font-roboto-light text-[14px]">
          All Receipts for {title}
        </p>
        <div className="mt-4">
          {hasReceipts ? (
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
