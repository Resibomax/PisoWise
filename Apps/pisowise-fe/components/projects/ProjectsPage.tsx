"use client";

import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./cards/ProjectCard";
import CreateProject from "./cards/CreateProjectCard";
import { CreateProjectModal } from "./modal/CreateProjectModal";
import { EditProjectModal } from "./modal/EditprojectModal";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import NoProjectsCard from "./cards/NoProjectsCard";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  spent?: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openCreateModal } = useModalStore();

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Projects fetched:", data);

        setProjects(data);

        data.forEach((project: Project, index: number) => {
          console.log(`Project ${index}:`, project);
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch projects",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading projects: {error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1380px] mx-auto mt-4 p-4 md:px-8 lg:px-16">
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
                id={project.id}
                title={project.name}
                description={project.description}
                budget={project.budget}
                spent={project.spent || 0}
                headerAction={
                  <div className="p-1 hover:bg-white rounded-[12px] transition-color hover:text-black text-white">
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
      <EditProjectModal />
    </div>
  );
}
