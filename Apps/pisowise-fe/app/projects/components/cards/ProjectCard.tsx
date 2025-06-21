import type React from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  budget: number;
  spent: number;
  headerAction?: React.ReactNode;
  className?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  budget,
  spent,
  headerAction,
  className = "",
}: ProjectCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/projects/${id}`);
  };
  const percentageUsed = (spent / budget) * 100;

  return (
    <div
      className={`relative bg-[#1B1212] rounded-xl px-[20px] py-[16px] shadow-lg w-full h-auto cursor-pointer ${className}`}
      onClick={handleViewDetails}
    >
      {headerAction && (
        <div className="absolute top-[16px] right-[20px] z-10">
          {headerAction}
        </div>
      )}

      {/* Header with title */}
      <div className="pr-12">
        <p className="font-[Ember] text-[24px] text-white">{title}</p>
      </div>

      <div>
        {/* Description */}
        <p className="font-roboto-light text-[16px] text-[#8B8483] mb-2">
          {description}
        </p>
        <p className="font-roboto-light text-[16px] text-[#8B8483] mb-2">
          {description}
        </p>
      </div>

      <div className="font-roboto-regular space-y-1 mb-[10px]">
        {/* Budget and Spent */}
        <div className="flex justify-between items-center text-white text-[20px]">
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
          <Progress
            value={Math.min(percentageUsed, 100)}
            className="h-2 bg-[#123524] [&>div]:bg-[#349868]"
          />
        </div>
      </div>

      <div className="font-roboto-regular text-gray-300 text-sm">
        {/* Percentage Used */}
        {percentageUsed.toFixed(1)}% Used
      </div>
    </div>
  );
}
