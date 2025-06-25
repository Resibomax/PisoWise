"use client";

import { useParams } from "next/navigation";
import { useProjectStore } from "@/app/store/projectsPage/projectStore";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { EditProjectModal } from "../components/modals/EditprojectModal";
import { ProjectHeader } from "./components/Header";
import { Button } from "@/components/ui/button";
import { Undo2, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import BudgetCard from "./components/cards/BudgetCard";
import ReceiptsCard from "./components/cards/ReceiptsCard";
import InsightsCard from "./components/cards/AIInsightsCard";
import WarningCard from "./components/cards/WarningCard";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getProjectById } = useProjectStore();
  const { openEditModal } = useModalStore();
  const { isAddReceiptButtonPressed, openAddReceiptPage, closeAddReceiptPage } =
    useModalStore();

  const project = params.id ? getProjectById(params.id as string) : null;

  const handleInputBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  if (!project) {
    return null;
  }

  const isSpentAboveThreshold = project.spent / project.budget > 0.8;

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col p-4 md:px-8 lg:px-16 text-white">
      <div className="flex-shrink-0">
        <ProjectHeader
          project={project}
          onEdit={() => openEditModal(project)}
        />
      </div>

      {/* Mobile-Tablet layout */}
      <div className="lg:hidden flex-1 flex flex-col space-y-[20px] mt-[20px]">
        <div className="flex-shrink-0">
          <BudgetCard spent={project.spent} budget={project.budget} />
          {isSpentAboveThreshold && (
            <WarningCard spent={project.spent} budget={project.budget} />
          )}
        </div>
        <div className="flex-1 min-h-0">
          <ReceiptsCard projectId={project.id} title={project.title} />
        </div>
        <div className="flex-1 min-h-0">
          <InsightsCard projectId={project.id} />
        </div>
      </div>

      {/*Desktop Layout*/}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 flex-1  mt-4">
        <div className="flex flex-col space-y-[20px] h-[460px]">
          <div className="flex-shrink-0">
            <BudgetCard spent={project.spent} budget={project.budget} />
            {isSpentAboveThreshold && (
              <WarningCard spent={project.spent} budget={project.budget} />
            )}
          </div>
          <div className="flex-1 min-h-0">
            <InsightsCard projectId={project.id} />
          </div>
        </div>

        <div className="flex flex-col min-h-0">
          <ReceiptsCard projectId={project.id} title={project.title} />
        </div>
      </div>

      <EditProjectModal />
      <div className="hidden justify-center w-full px-4 mt-4">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="self-start">
            <Button
              className="bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white flex items-center gap-2"
              onClick={() => router.back()}
            >
              <Undo2 className="h-5 w-5" />
              <span className="font-roboto-regular text-base sm:text-lg">
                Back
              </span>
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={handleInputBoxClick}
            className="flex flex-col items-center justify-center bg-[#1B1212] h-[294px] w-full rounded-[12px] cursor-pointer hover:bg-[#2a1f1f] transition"
          >
            <ImageIcon className="text-[#FBF5F3] w-[100px] h-[100px]" />
            <p className="text-[#FBF5F3] font-roboto text-base sm:text-lg mt-4 text-center">
              Upload a picture of the receipt
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button className="text-base sm:text-lg font-light text-[#FBF5F3] bg-[#349868] w-full rounded-[12px]">
              Upload
            </Button>
            <Button className="text-base sm:text-lg font-light border bg-transparent text-[#FBF5F3] w-full rounded-[12px]">
              Manual Input
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
