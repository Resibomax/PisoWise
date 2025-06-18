import type React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  budget: number;
  spent: number;
  headerAction?: React.ReactNode;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  budget,
  spent,
  headerAction,
  className = "",
}: ProjectCardProps) {
  const percentageUsed = (spent / budget) * 100;

  return (
    <Card>
      <div
        className={`bg-black rounded-xl px-[20px] py-[16px] shadow-lg w-full h-auto ${className}`}
      >
        <CardHeader className="flex items-center justify-between text-white">
          {/* Header with title and action */}
          <p className="font-[Ember] text-[24px]">{title}</p>
          {headerAction}
        </CardHeader>

        <CardDescription>
          {/* Description */}
          <p
            className={`font-roboto-light text-[16px] text-[#8B8483] mb-2`}
          >
            {description}
          </p>
        </CardDescription>

        <CardContent className={`font-roboto-regular space-y-1 mb-[10px]`}>
          {/* Budget and Spent */}
          <div
            className={`flex justify-between items-center text-white  text-[20px]`}
          >
            <span>Budget:</span>
            <span>₱{budget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[20px] text-[#349868]">
            <span>Spent:</span>
            <span>₱{spent.toLocaleString()}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <Progress
              value={Math.min(percentageUsed, 100)}
              className="h-2 bg-[#123524] [&>div]:bg-[#349868]"
            />
          </div>
        </CardContent>

        <CardFooter className={`font-roboto-regular text-gray-300 text-sm`}>
          {/* Percentage Used */}
            {percentageUsed.toFixed(1)}% Used
        </CardFooter>
      </div>
    </Card>
  );
}
