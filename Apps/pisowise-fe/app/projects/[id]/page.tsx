"use client";

import { useParams, useRouter } from "next/navigation";
import { useProjectStore } from "@/app/store/projectsPage/projectStore";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { EditProjectModal } from "../components/modals/EditprojectModal";
import { ProjectHeader } from "./components/Header";
import BudgetCard from "./components/BudgetCard";
import ReceiptsCard from "./components/ReceiptsCard";
import InsightsCard from "./components/AIInsightsCard";
import WarningCard from "./components/WarningCard";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getProjectById } = useProjectStore();
  const { openEditModal } = useModalStore();

  const project = params.id ? getProjectById(params.id as string) : null;

  if (!project) {
    return (
      <div>
        <h1>Project Not Found</h1>
        <button onClick={() => router.push("/projects")}>
          Back to Projects
        </button>
      </div>
    );
  }

  const isSpentAboveThreshold = project.spent / project.budget > 0.8;

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 p-4 md:px-8 lg:px-16 text-white">
      <ProjectHeader project={project} onEdit={() => openEditModal(project)} />
      <div className="space-y-[20px]">
        <div>
          <BudgetCard spent={project.spent} budget={project.budget} />
          {isSpentAboveThreshold && (
            <WarningCard spent={project.spent} budget={project.budget} />
          )}
        </div>
        <ReceiptsCard projectId={project.id} title={project.title} />
        <InsightsCard projectId={project.id} />
      </div>
      <EditProjectModal />
    </div>
  );
}
