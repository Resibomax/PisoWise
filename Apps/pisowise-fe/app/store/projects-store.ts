import { create } from "zustand";
import { useAuthStore } from "./auth-store";

interface Project {
  user_id: string;
  project_id: string;
  name: string;
  description: string;
  budget: number;
  amount_spent: number;
}

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProjects: (userId: string) => Promise<void>;
  refetchProjects: (userId: string) => Promise<void>;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  clearProjects: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/projects?user_id=${userId}`;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const projects = await response.json();
      set({ projects, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch projects",
        isLoading: false,
      });
    }
  },

  refetchProjects: async (userId: string) => {
    await get().fetchProjects(userId);
  },

  addProject: (project: Project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }));
  },

  updateProject: (projectId: string, updates: Partial<Project>) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.project_id === projectId ? { ...project, ...updates } : project,
      ),
    }));
  },

  deleteProject: (projectId: string) => {
    set((state) => ({
      projects: state.projects.filter(
        (project) => project.project_id !== projectId,
      ),
    }));
  },

  clearProjects: () => {
    set({ projects: [], error: null, isLoading: false });
  },
}));
