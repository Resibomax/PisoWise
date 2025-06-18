"use client";

import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./cards/ProjectCard";
import CreateProject from "./cards/CreateProjectCard";
import { CreateProjectModal } from "./modals/CreateProjectModal";
import { EditProjectModal } from "./modals/EditprojectModal";
import { useProjectStore } from "@/app/store/projectStore";

export default function ProjectsPage() {
  const {
    projects,
    isCreateModalOpen,
    isEditModalOpen,
    selectedProject,
    addProject,
    updateProject,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
  } = useProjectStore();

  return (
    <div className="flex flex-col items-center justify-center min-w-[320px] mt-10 px-[16px]">
      <div className="flex flex-row items-center justify-between md:justify-start gap-6 w-full mb-2">
        <p className="text-3xl font-[Ember] text-white">Projects</p>
        <Button
          onClick={openCreateModal}
          className="bg-[#1B1212] hover:bg-[#1B1212]/50 text-white font-[Ember] rounded-[12px] text-[16px]"
        >
          <Plus className="w-8 h-8 " />
          Create
        </Button>
      </div>

      {/*Project*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full m-[16px]">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            budget={project.budget}
            spent={project.spent}
            headerAction={
              <SquarePen
                className="w-5 h-5 cursor-pointer transition-colors hover:text-gray-600"
                onClick={() => openEditModal(project)}
              />
            }
            className="w-full rounded-xl shadow-lg p-6"
          />
        ))}
        <CreateProject onClick={openCreateModal} />
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={addProject}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEdit={updateProject}
        project={selectedProject}
      />
    </div>
  );
}
