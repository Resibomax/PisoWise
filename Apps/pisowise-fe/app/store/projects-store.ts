import { create } from "zustand"
import { useAuthStore } from "./auth-store"
import axios from "axios"

interface Project {
  user_id: string
  project_id: string
  name: string
  description: string
  budget: number
  amount_spent: number
}

interface ProjectsState {
  projects: Project[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchProjects: (userId: string) => Promise<void>
  refetchProjects: (userId: string) => Promise<void>
  addProject: (project: Project) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  deleteProject: (projectId: string) => void
  clearProjects: () => void
  getProjectById: (projectId: string) => Project | null
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async (userId: string) => {
    try {
      set({ isLoading: true, error: null })

      const headers = await useAuthStore.getState().getAuthHeaders()
      const url = `${API_URL}/projects?user_id=${userId}`

      const response = await axios.get(url, { headers })

      set({ projects: response.data, isLoading: false })
    } catch (error) {
      console.error("Error fetching projects:", error)

      let errorMessage = "Failed to fetch projects"

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      set({
        error: errorMessage,
        isLoading: false,
      })
    }
  },

  refetchProjects: async (userId: string) => {
    await get().fetchProjects(userId)
  },

  addProject: (project: Project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }))
  },

  updateProject: (projectId: string, updates: Partial<Project>) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.project_id === projectId ? { ...project, ...updates } : project,
      ),
    }))
  },

  deleteProject: (projectId: string) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.project_id !== projectId),
    }))
  },

  clearProjects: () => {
    set({ projects: [], error: null, isLoading: false })
  },

  getProjectById: (projectId: string): Project | null => {
    const state = get()
    return state.projects.find((project) => project.project_id === projectId) || null
  },
}))
