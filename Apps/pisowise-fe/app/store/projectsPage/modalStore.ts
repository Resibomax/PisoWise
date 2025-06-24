import { create } from "zustand";
import type { Project } from "@/app/projects/mockProject";

interface ModalStore {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isConfirmDeleteModalOpen?: boolean;
  selectedProject: Project | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (project: Project) => void;
  closeEditModal: () => void;
  openConfirmDeleteModal: () => void;
  closeConfirmDeleteModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isConfirmDeleteModalOpen: false,
  selectedProject: null,

  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openConfirmDeleteModal: () => set({ isConfirmDeleteModalOpen: true }),
  closeConfirmDeleteModal: () => set({ isConfirmDeleteModalOpen: false }),

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
