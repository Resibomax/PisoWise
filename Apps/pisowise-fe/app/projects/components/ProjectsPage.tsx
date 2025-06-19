"use client";

import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./cards/ProjectCard";
import CreateProject from "./cards/CreateProjectCard";
import { CreateProjectModal } from "./modals/CreateProjectModal";
import { EditProjectModal } from "./modals/EditprojectModal";
import { useProjectStore } from "@/app/store/projectStore";
import NoProjectsCard from "./cards/NoProjectsCard";

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
    <div className="w-full max-w-7xl mx-auto mt-4 p-4 md:px-8 lg:px-16">
      <div className="flex flex-row items-center justify-between md:justify-start gap-6 w-full mb-6">
        <p className="text-3xl font-[Ember] text-white">Projects</p>
        <Button
          onClick={openCreateModal}
          className="bg-[#1B1212] hover:bg-[#FBF5F3] hover:text-black text-white font-[Ember] rounded-[12px] text-[16px] cursor-pointer"
        >
          <Plus className="w-8 h-8" />
          Create
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="w-full">
        {projects.length === 0 ? (
          <div className="flex justify-center md:justify-start">
            <NoProjectsCard onClick={openCreateModal} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                budget={project.budget}
                spent={project.spent}
                headerAction={
                  <div className="p-1 hover:bg-white rounded-full transition-color hover:text-black">
                    <SquarePen
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => openEditModal(project)}
                    />
                  </div>
                }
                className="w-full rounded-xl shadow-lg p-6"
              />
            ))}
            <CreateProject onClick={openCreateModal} />
          </div>
        )}
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
