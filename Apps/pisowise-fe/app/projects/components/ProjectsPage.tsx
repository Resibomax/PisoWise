"use client";
import ProjectCard from "./cards/ProjectCard";
import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateProject from "./cards/CreateProjectCard";
import { mockProjects, type Project } from "../mockProject";
import { useState } from "react";
import { CreateProjectModal } from "./modals/CreateProjectModal";
import { EditProjectModal } from "./modals/EditprojectModal";

export default function ProjectsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [projects, setProjects] = useState(mockProjects);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleCreateProject = (title: string, description: string, budget: number) => {
    // Generate a unique ID for the new project
    const newId = (projects.length + 1).toString()

    const newProject: Project = {
      id: newId,
      title,
      description,
      budget,
      spent: 0, // New projects start with 0 spent
    }

    // Add the new project to the projects state
    setProjects((prevProjects) => [...prevProjects, newProject])
    setIsCreateModalOpen(false)
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (id: string, title: string, description: string, budget: number) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === id ? { ...project, title, description, budget } : project)),
    )
    setIsEditModalOpen(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-[320px] mt-10">
      {/*Header*/}
      <div className="flex flex-row items-center justify-between w-[320px]">
        <p className="text-3xl font-[Ember] text-white mb-2">Projects</p>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-black hover:bg-black/50 text-white font-[Ember] rounded-[12px] text-[16px]">
          <Plus className="w-8 h-8 " />
          Create
        </Button>
      </div>

      {/*Project*/}
      <div className="grid grid-cols-1 md:grid-cols-4 min-w-[320px] m-[16px] space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            budget={project.budget}
            spent={project.spent}
            headerAction={
              <SquarePen className="w-5 h-5 cursor-pointer transition-colors hover:text-gray-600" onClick={() => handleEditProject(project)}/>
            }
            className="w-auto rounded-xl shadow-lg p-6"
          />
        ))}
        <CreateProject onClick={() => setIsCreateModalOpen(true)} />
      </div>

      <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateProject}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleSaveEdit}
        project={selectedProject}
      />
    </div>
  );
}
