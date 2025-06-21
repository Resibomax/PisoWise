"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BudgetCardProps {
  spent: number;
  budget: number;
  className?: string;
}

export default function BudgetCard({
  spent,
  budget,
  className,
}: BudgetCardProps) {
  const budgetPercentage = (spent / budget) * 100;

  return (
    <Card
      className={cn(
        "bg-[#1B1212] border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow",
        className,
      )}
    >
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-white text-[16px] font-roboto-regular">
                Spent:
              </p>
              <p className="text-white font-[Ember] text-[20px]">
                ₱{spent.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-white text-[16px] font-roboto-regular">
                Budget:
              </p>
              <p className="text-white font-[Ember] text-[20px]">
                ₱{budget.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <Progress
              value={Math.min(budgetPercentage, 100)}
              className={`w-full h-2 bg-[#246A49] [&>div]:bg-[#349868]`}
            />
            <span className={`font-roboto-regular text-gray-300 text-sm`}>
              {budgetPercentage.toFixed(1)}% Used
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
