"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Undo2, Trash, SquarePen } from "lucide-react";

interface Project {
  title: string;
 
}

interface ProjectHeaderProps {
  project: Project;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function ProjectHeader({
  project,
  onDelete,
  onEdit,
}: ProjectHeaderProps) {
  const router = useRouter();

  return (
    <div className="gap-[20px] flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Button
          className="flex gap-2 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
          onClick={() => router.back()}
        >
          <Undo2 className="cursor-pointer h-5 w-5" />
          <p className="font-roboto-regular text-[16px]">Back</p>
        </Button>

        <Button
          className="flex gap-2 items-center bg-transparent border-1 border-[#E73648] text-[#E73648] hover:bg-[#E73648] hover:text-white rounded-[12px] text-[16px]"
          onClick={onDelete}
        >
          <Trash className="cursor-pointer h-6 w-6" />
          <p className="font-roboto-regular text-[16px]">Delete</p>
        </Button>
      </div>

      {/* Project Title and Edit Button */}
      <div className="flex flex-row items-center justify-between md:justify-start gap-6 w-full mb-[20px]">
        <p className="text-[24px] font-[Ember] text-white">{project.title}</p>
        <Button
          className="bg-[#1B1212] hover:bg-[#FBF5F3] hover:text-black text-white font-[Ember] rounded-[12px] text-[16px] cursor-pointer"
          onClick={onEdit}
        >
          <SquarePen className="w-5 h-5" />
          Edit
        </Button>
      </div>
    </div>
  );
}
