"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";


export default function InsightsCard() {
  return (
    <Card
      className={cn(
        "bg-[#1B1212] border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow",
      )}
    >
      <CardContent className="p-5">
        <div className="text-white">
          <p className="font-[Ember] text-[24px]">AI Insights</p>
          <p className="font-roboto-light text-[14px]">Summary of Expenses</p>
        </div>
      </CardContent>
    </Card>
  );
}
