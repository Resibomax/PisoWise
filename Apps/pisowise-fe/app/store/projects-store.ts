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
  updateProject: (
    projectId: string,
    updates: Partial<Project>,
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  clearProjects: () => void;
  getProjectById: (projectId: string) => Project | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleError = (error: unknown): string => {
  return axios.isAxiosError(error)
    ? error.response?.data?.message || error.message
    : "An unexpected error occurred";
};

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
      set({ error: handleError(error), isLoading: false });
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
      const errorMessage = handleError(error);
      set({ error: errorMessage, isLoading: false });
      toast.error("Failed to create project", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
  },

  updateProject: async (projectId, updates) => {
    const originalProjects = get().projects;
    const currentProject = originalProjects.find(
      (p) => p.project_id === projectId,
    );

    if (!currentProject) {
      toast.error("Project not found");
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const headers = await useAuthStore.getState().getAuthHeaders();

      // Optimistic update
      set((state) => ({
        projects: state.projects.map((project) =>
          project.project_id === projectId
            ? { ...project, ...updates }
            : project,
        ),
      }));

      const updateData = {
        name: updates.name,
        description: updates.description,
        budget: updates.budget,
        user_id: currentProject.user_id,
        project_id: projectId,
        amount_spent: currentProject.amount_spent,
        creation_date: new Date().toISOString().split("T")[0],
      };

      const response = await axios.put(
        `${API_URL}/projects/${projectId}`,
        updateData,
        { headers },
      );

      set((state) => ({
        projects: state.projects.map((project) =>
          project.project_id === projectId ? response.data : project,
        ),
        isLoading: false,
      }));

      toast.success("Project updated successfully", {
        description: "Your project has been updated.",
        style: { backgroundColor: "#349868", color: "white" },
      });
    } catch (error) {
      // Revert optimistic update on error
      set({ projects: originalProjects, isLoading: false });
      const errorMessage = handleError(error);
      set({ error: errorMessage });
      toast.error("Failed to update project", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
  },

  deleteProject: async (projectId) => {
    const originalProjects = get().projects;
    const projectToDelete = originalProjects.find(
      (p) => p.project_id === projectId,
    );

    if (!projectToDelete) {
      toast.error("Project not found");
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const headers = await useAuthStore.getState().getAuthHeaders();

      // Optimistic update
      set((state) => ({
        projects: state.projects.filter(
          (project) => project.project_id !== projectId,
        ),
      }));

      await axios.delete(`${API_URL}/projects/${projectId}`, { headers });

      set({ isLoading: false });

      toast.success("Project deleted successfully", {
        description: `"${projectToDelete.name}" has been deleted.`,
        style: { backgroundColor: "#349868", color: "white" },
      });
    } catch (error) {
      // Revert optimistic update on error
      set({ projects: originalProjects, isLoading: false });
      const errorMessage = handleError(error);
      set({ error: errorMessage });
      toast.error("Failed to delete project", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
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
