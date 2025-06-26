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
  isAddItemModalOpen?: boolean;
  isChangeStoreModalOpen: boolean;
  isChangeDateModalOpen: boolean;
  isChangeItemModalOpen?: boolean;
  isInEditMode: boolean;
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
  openAddItemModal?: () => void;
  closeAddItemModal?: () => void;
  openChangeStoreModal?: () => void;
  closeChangeStoreModal?: () => void;
  openChangeDateModal?: () => void;
  closeChangeDateModal?: () => void;
  openChangeItemModal?: () => void;
  closeChangeItemModal?: () => void;
  openManualReceipt?: () => void;
  closeManualReceipt?: () => void;
  setManualInput: (value: boolean) => void;
  openImageModal?: () => void;
  closeImageModal?: () => void;
  toggleEditModeOn: () => void;
  toggleEditModeOff: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isConfirmDeleteModalOpen: false,
  isAddReceiptButtonPressed: false,
  isManualReceiptButtonPressed: false,
  isAddStoreModalOpen: false,
  isAddDateModalOpen: false,
  isAddItemModalOpen: false,
  isChangeStoreModalOpen: false,
  isChangeDateModalOpen: false,
  isChangeItemModalOpen: false,
  selectedProject: null,
  isImageModalOpen: false,
  isInEditMode: false,

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

  openAddItemModal: () => set({ isAddItemModalOpen: true }),
  closeAddItemModal: () => set({ isAddItemModalOpen: false }),

  openChangeStoreModal: () => set({ isChangeStoreModalOpen: true }),
  closeChangeStoreModal: () => set({ isChangeStoreModalOpen: false }),

  openChangeDateModal: () => set({ isChangeDateModalOpen: true }),
  closeChangeDateModal: () => set({ isChangeDateModalOpen: false }),

  openChangeItemModal: () => set({ isChangeItemModalOpen: true }),
  closeChangeItemModal: () => set({ isChangeItemModalOpen: false }),

  openManualReceipt: () => set({ isManualReceiptButtonPressed: true }),
  closeManualReceipt: () => set({ isManualReceiptButtonPressed: false }),

  setManualInput: (value) => set({ isManualReceiptButtonPressed: value }),

  toggleEditModeOn: () => set({ isInEditMode: true }),
  toggleEditModeOff: () => set({ isInEditMode: false }),

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
