"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Undo2, Trash, SquarePen } from "lucide-react";

interface Receipt {
  title: string;
}

interface ProjectHeaderProps {
  receipt: Receipt;
  onDelete?: () => void;
  onEdit?: () => void;
  isEditMode?: boolean;
  onCancel?: () => void;
}

export function ReceiptsHeader({
  receipt,
  onEdit,
  isEditMode = false,
  onCancel,
}: ProjectHeaderProps) {
  const router = useRouter();

  // Action buttons component
  const ActionButtons = ({ showDelete = true }) => (
    <>
      <Button
        className="bg-[#1B1212] hover:bg-[#FBF5F3] hover:text-black text-white font-[Ember] rounded-[12px] text-[16px] cursor-pointer"
        onClick={isEditMode ? onCancel : onEdit}
      >
        {isEditMode ? (
          "Cancel"
        ) : (
          <>
            <SquarePen className="w-5 h-5" />
            Edit
          </>
        )}
      </Button>
      {showDelete && (
        <Button className="flex gap-2 items-center bg-transparent border-1 border-[#E73648] text-[#E73648] hover:bg-[#E73648] hover:text-white rounded-[12px] text-[16px]">
          <Trash className="cursor-pointer h-6 w-6" />
          <p className="font-roboto-regular text-[16px]">Delete</p>
        </Button>
      )}
    </>
  );

  return (
    <div className="gap-[20px] flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Button
          className="flex gap-2 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
          onClick={() => router.back()}
          disabled={isEditMode}
        >
          <Undo2 className="cursor-pointer h-5 w-5" />
          <p className="font-roboto-regular text-[16px]">Back</p>
        </Button>

        <Button className="lg:hidden flex gap-2 items-center bg-transparent border-1 border-[#E73648] text-[#E73648] hover:bg-[#E73648] hover:text-white rounded-[12px] text-[16px]">
          <Trash className="cursor-pointer h-6 w-6" />
          <p className="font-roboto-regular text-[16px]">Delete</p>
        </Button>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-row items-center justify-start gap-6 w-full">
        <p className="text-[24px] font-[Ember] text-white md:text-3xl">
          {receipt.title}
        </p>
        <ActionButtons />
      </div>

      {/* Mobile-Tablet */}
      <div className="flex lg:hidden flex-row items-center justify-between md:justify-start gap-6 w-full">
        <p className="text-[24px] font-[Ember] text-white md:text-3xl">
          {receipt.title}
        </p>
        <ActionButtons showDelete={false} />
      </div>
    </div>
  );
}
