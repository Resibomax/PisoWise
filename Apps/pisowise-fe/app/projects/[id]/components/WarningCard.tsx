"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarningCardProps {
  spent: number;
  budget: number;
}

export default function WarningCard({ spent, budget }: WarningCardProps) {
  const budgetPercentage = (spent / budget) * 100;
  const remainingBudget = budget - spent;

  return (
    <Card
      className={cn(
        "bg-[#349868] border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div>
            <TriangleAlert className="w-6 h-6 text-white" />
          </div>
          <div className="text-white px-5">
            <p className="text-[16px] font-roboto-regular">
              Approaching Budget Limit
            </p>
            <p className="text-[12px] font-roboto-light">
              You&rsquo;ve used {budgetPercentage.toFixed(1)}% of your Budget. ₱
              {remainingBudget.toLocaleString()} remaining.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
