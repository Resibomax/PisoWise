"use client";

import { useParams } from "next/navigation";
import { useProjectsStore } from "@/app/store/projects-store";
import { useModalStore } from "@/app/store/modal-store";
import { EditProjectModal } from "@/components/projects/modal/EditprojectModal";
import { ProjectHeader } from "@/components/projects/details/Header";
import AddReceipt from "@/components/projects/details/AddReceipt";
import BudgetCard from "@/components/projects/details/cards/BudgetCard";
import ReceiptsCard from "@/components/projects/details/cards/ReceiptsCard";
import InsightsCard from "@/components/projects/details/cards/AIInsightsCard";
import WarningCard from "@/components/projects/details/cards/WarningCard";
import ManualAddReceipt from "@/components/projects/details/ManualAddReceipt";
import Loader from "@/components/ui/loader";

export default function ProjectDetailsPage() {
  const params = useParams();
  const { getProjectById } = useProjectsStore();
  const {
    isAddReceiptButtonPressed,
    isManualReceiptButtonPressed,
    openEditModal,
  } = useModalStore();

  const project = params.id ? getProjectById(params.id as string) : null;

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const isSpentAboveThreshold = project.amount_spent / project.budget > 0.8;

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
              <BudgetCard
                spent={project.amount_spent}
                budget={project.budget}
              />
              {isSpentAboveThreshold && (
                <WarningCard
                  spent={project.amount_spent}
                  budget={project.budget}
                />
              )}
            </div>
            <div className="flex-1 min-h-0">
              <ReceiptsCard
                projectId={project.project_id}
                title={project.name}
              />
            </div>
            <div className="flex-1 min-h-0">
              <InsightsCard projectId={project.project_id} />
            </div>
          </div>

          {/*Desktop Layout*/}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 flex-1  mt-4">
            <div className="flex flex-col space-y-[20px] h-[460px]">
              <div className="flex-shrink-0">
                <BudgetCard
                  spent={project.amount_spent}
                  budget={project.budget}
                />
                {isSpentAboveThreshold && (
                  <WarningCard
                    spent={project.amount_spent}
                    budget={project.budget}
                  />
                )}
              </div>
              <div className="flex-1 min-h-0">
                <InsightsCard projectId={project.project_id} />
              </div>
            </div>

            <div className="flex flex-col min-h-0">
              <ReceiptsCard
                projectId={project.project_id}
                title={project.name}
              />
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
