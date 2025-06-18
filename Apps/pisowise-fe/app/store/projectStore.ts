import { create } from "zustand"
import { mockProjects, type Project } from "../projects/mockProject"

interface ProjectStore {
  // State
  projects: Project[]
  isCreateModalOpen: boolean
  isEditModalOpen: boolean
  selectedProject: Project | null

  // Actions
  addProject: (title: string, description: string, budget: number) => void
  updateProject: (id: string, title: string, description: string, budget: number) => void
  deleteProject: (id: string) => void

  // Modal actions
  openCreateModal: () => void
  closeCreateModal: () => void
  openEditModal: (project: Project) => void
  closeEditModal: () => void
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  projects: mockProjects,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedProject: null,

  // Project actions
  addProject: (title: string, description: string, budget: number) => {
    const { projects } = get()
    const newId = (projects.length + 1).toString()

    const newProject: Project = {
      id: newId,
      title,
      description,
      budget,
      spent: 0,
    }

    set((state) => ({
      projects: [...state.projects, newProject],
      isCreateModalOpen: false,
    }))
  },

  updateProject: (id: string, title: string, description: string, budget: number) => {
    set((state) => ({
      projects: state.projects.map((project: Project) =>
        project.id === id ? { ...project, title, description, budget } : project,
      ),
      isEditModalOpen: false,
    }))
  },

  deleteProject: (id: string) => {
    set((state) => ({
      projects: state.projects.filter((project: Project) => project.id !== id),
    }))
  },

  // Modal actions
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openEditModal: (project: Project) =>
    set({
      selectedProject: project,
      isEditModalOpen: true,
    }),

  closeEditModal: () =>
    set({
      isEditModalOpen: false,
      selectedProject: null,
    }),
}))
