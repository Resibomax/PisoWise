"use client";

import { useParams } from "next/navigation";
import { useProjectStore } from "@/app/store/projectsPage/projectStore";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { EditProjectModal } from "../components/modals/EditprojectModal";
import { ProjectHeader } from "./components/Header";
import AddReceipt from "@/app/projects/[id]/components/AddReceipt";
import BudgetCard from "./components/cards/BudgetCard";
import ReceiptsCard from "./components/cards/ReceiptsCard";
import InsightsCard from "./components/cards/AIInsightsCard";
import WarningCard from "./components/cards/WarningCard";
import ManualAddReceipt from "@/app/projects/[id]/components/ManualAddReceipt";

export default function ProjectDetailsPage() {
  const params = useParams();
  const { getProjectById } = useProjectStore();
  const { openEditModal } = useModalStore();
  const { isAddReceiptButtonPressed, isManualReceiptButtonPressed } =
    useModalStore();

  const project = params.id ? getProjectById(params.id as string) : null;

  if (!project) {
    return null;
  }

  const isSpentAboveThreshold = project.spent / project.budget > 0.8;

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col p-4 md:px-8 lg:px-16 text-white">
      {!isAddReceiptButtonPressed ? (
        <>
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
        </>
      ) : isManualReceiptButtonPressed ? (
        <ManualAddReceipt />
      ) : (
        <AddReceipt />
      )}
    </div>
  );
}
