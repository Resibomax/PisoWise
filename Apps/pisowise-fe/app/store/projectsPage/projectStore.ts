import { create } from "zustand";
import { mockProjects, type Project } from "@/app/projects/mockProject";
import { toast } from "sonner";

interface ProjectStore {
  projects: Project[];
  addProject: (title: string, description: string, budget: number) => void;
  updateProject: (
    id: string,
    title: string,
    description: string,
    budget: number,
  ) => void;
  deleteProject: (id: string, onSuccess?: () => void) => void;
  getProjectById: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: mockProjects,

  addProject: (title: string, description: string, budget: number) => {
    try {
      const { projects } = get();
      const newId = (projects.length + 1).toString();

      const newProject: Project = {
        id: newId,
        title,
        description,
        budget,
        spent: 0,
      };

      set((state) => ({
        projects: [...state.projects, newProject],
      }));

      toast.success("Project created successfully", {
        description: `"${title}" has been added to your projects.`,
        style: {
          backgroundColor: "#349868",
          color: "white",
        },
      });
    } catch {
      toast.error("Failed to create project", {
        description: "Please try again.",
        style: {
          backgroundColor: "#E73648",
          color: "white",
        },
      });
    }
  },

  updateProject: (
    id: string,
    title: string,
    description: string,
    budget: number,
  ) => {
    try {
      set((state) => ({
        projects: state.projects.map((project: Project) =>
          project.id === id
            ? { ...project, title, description, budget }
            : project,
        ),
      }));

      toast.success("Project updated successfully", {
        description: `"${title}" has been updated.`,
        style: {
          backgroundColor: "#349868",
          color: "white",
        },
      });
    } catch {
      toast.error("Failed to update project", {
        description: "Please try again.",
        style: {
          backgroundColor: "#E73648",
          color: "white",
        },
      });
    }
  },

  deleteProject: (id: string, onSuccess?: () => void) => {
    try {
      set((state) => ({
        projects: state.projects.filter(
          (project: Project) => project.id !== id,
        ),
      }));

      toast.success("Project deleted successfully", {
        description: `The project has been removed.`,
        style: {
          backgroundColor: "#349868",
          color: "white",
        },
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch {
      toast.error("Failed to delete project", {
        description: "Please try again.",
        style: {
          backgroundColor: "#E73648",
          color: "white",
        },
      });
    }
  },

  getProjectById(id) {
    const { projects } = get();
    return projects.find((project) => project.id === id);
  },
}));
