import { create } from "zustand";
import type { Project } from "@/app/projects/mockProject";

interface ModalStore {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isConfirmDeleteModalOpen?: boolean;
  isAddReceiptButtonPressed: boolean;
  isManualReceiptButtonPressed?: boolean;
  isAddStoreModalOpen: boolean;
  isAddDateModalOpen: boolean;
  selectedProject: Project | null;
  isImageModalOpen?: boolean;

  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (project: Project) => void;
  closeEditModal: () => void;
  openConfirmDeleteModal: () => void;
  closeConfirmDeleteModal: () => void;
  openAddReceiptPage: () => void;
  closeAddReceiptPage: () => void;
  openAddStoreModal: () => void;
  closeAddStoreModal: () => void;
  openAddDateModal: () => void;
  closeAddDateModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isConfirmDeleteModalOpen: false,
  isAddReceiptButtonPressed: false,
  isManualReceiptButtonPressed: false,
  isAddStoreModalOpen: false,
  isAddDateModalOpen: false,
  selectedProject: null,
  isImageModalOpen: false,

  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openConfirmDeleteModal: () => set({ isConfirmDeleteModalOpen: true }),
  closeConfirmDeleteModal: () => set({ isConfirmDeleteModalOpen: false }),

  openAddReceiptPage: () => set({ isAddReceiptButtonPressed: true }),
  closeAddReceiptPage: () => set({ isAddReceiptButtonPressed: false }),

  openAddStoreModal: () => set({ isAddStoreModalOpen: true }),
  closeAddStoreModal: () => set({ isAddStoreModalOpen: false }),

  openAddDateModal: () => set({ isAddDateModalOpen: true }),
  closeAddDateModal: () => set({ isAddDateModalOpen: false }),

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

  openImageModal: () => set({ isImageModalOpen: true }),
  closeImageModal: () => set({ isImageModalOpen: false }),
}));
