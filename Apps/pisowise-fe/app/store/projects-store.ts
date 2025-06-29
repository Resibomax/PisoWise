import { create } from "zustand";
import { useAuthStore } from "./auth-store";
import axios from "axios";
import { toast } from "sonner";

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
  fetchProjects: (userId: string) => Promise<void>;
  refetchProjects: (userId: string) => Promise<void>;
  addProject: (
    project: Omit<Project, "user_id" | "project_id">,
    userId: string,
  ) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  clearProjects: () => void;
  getProjectById: (projectId: string) => Project | null;
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
      const response = await axios.get(
        `${API_URL}/projects?user_id=${userId}`,
        { headers },
      );
      set({ projects: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to fetch projects";
      set({ error: errorMessage, isLoading: false });
    }
  },

  refetchProjects: async (userId: string) => {
    await get().fetchProjects(userId);
  },

  addProject: async (project, userId) => {
    try {
      set({ isLoading: true, error: null });
      const headers = await useAuthStore.getState().getAuthHeaders();

      const projectData = {
        ...project,
        user_id: userId,
        amount_spent: 0,
        creation_date: new Date().toISOString().split("T")[0],
      };

      const response = await axios.post(`${API_URL}/projects`, projectData, {
        headers,
      });

      set((state) => ({
        projects: [...state.projects, response.data],
        isLoading: false,
      }));

      toast.success("Project created successfully", {
        description: `"${project.name}" has been added to your projects.`,
        style: { backgroundColor: "#349868", color: "white" },
      });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to create project";

      set({ error: errorMessage, isLoading: false });
      toast.error("Failed to create project", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
  },

  updateProject: (projectId, updates) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.project_id === projectId ? { ...project, ...updates } : project,
      ),
    }));
  },

  deleteProject: (projectId) => {
    set((state) => ({
      projects: state.projects.filter(
        (project) => project.project_id !== projectId,
      ),
    }));
  },

  clearProjects: () => {
    set({ projects: [], error: null, isLoading: false });
  },

  getProjectById: (projectId) => {
    return (
      get().projects.find((project) => project.project_id === projectId) || null
    );
  },
}));
