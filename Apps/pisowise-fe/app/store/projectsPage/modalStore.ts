import { create } from "zustand";
import type { Project } from "@/app/projects/mockProject";

interface ModalStore {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedProject: Project | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (project: Project) => void;
  closeEditModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedProject: null,

  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openEditModal: (project: Project) => {
    set({
      selectedProject: project,
      isEditModalOpen: true,
    });
  },

  closeEditModal: () => {
    set({
      isEditModalOpen: false,
      selectedProject: null,
    });
  },
}));
