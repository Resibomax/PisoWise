"use client";

import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./cards/ProjectCard";
import CreateProject from "./cards/CreateProjectCard";
import { useModalStore } from "@/app/store/modal-store";
import NoProjectsCard from "./cards/NoProjectsCard";
import Loader from "@/components/ui/loader";
import { useProjectsPage } from "@/app/hooks/use-projects-page";
import { CreateProjectModal } from "./modal/CreateProjectModal";

export default function ProjectsPage() {
  const { openCreateModal } = useModalStore();
  const { isAuthenticated, projects, isLoading, error, refetchProjects } =
    useProjectsPage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-white mb-4">
            Please sign in to view your projects
          </p>
          <Button
            onClick={() => (window.location.href = "/auth/signin")}
            variant="outline"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading projects: {error}</p>
          <Button onClick={refetchProjects} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1380px] mx-auto mt-4 p-4 md:px-8 lg:px-16">
      <div className="flex flex-row items-center justify-between md:justify-start gap-6 w-full mb-6">
        <div>
          <p className="text-3xl font-[Ember] text-white">My Projects</p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-[#1B1212] hover:bg-[#FBF5F3] hover:text-black text-white font-[Ember] rounded-[12px] text-[16px] cursor-pointer"
        >
          <Plus className="w-8 h-8" />
          Create
        </Button>
      </div>

      <div className="w-full">
        {projects.length === 0 ? (
          <div className="flex justify-center md:justify-start">
            <NoProjectsCard onClick={openCreateModal} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {projects.map((project) => (
              <ProjectCard
                key={project.project_id}
                id={project.project_id}
                title={project.name}
                description={project.description}
                budget={project.budget}
                spent={project.amount_spent}
                headerAction={
                  <div
                    className="p-1 hover:bg-white rounded-[12px] transition-color hover:text-black text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <SquarePen className="w-5 h-5 cursor-pointer" />
                  </div>
                }
                className="w-full rounded-xl shadow-lg p-6"
              />
            ))}
            <CreateProject onClick={openCreateModal} />
          </div>
        )}
      </div>
      <CreateProjectModal />
    </div>
  );
}
