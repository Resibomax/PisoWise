import { create } from "zustand";
import { useProjectStore } from "./projectStore";
import { useModalStore } from "./modalStore";

interface FormStore {
  createForm: {
    title: string;
    description: string;
    budget: string;
  };
  editForm: {
    title: string;
    description: string;
    budget: string;
  };
  setCreateFormField: (
    field: "title" | "description" | "budget",
    value: string,
  ) => void;
  setEditFormField: (
    field: "title" | "description" | "budget",
    value: string,
  ) => void;
  resetCreateForm: () => void;
  resetEditForm: () => void;
  submitCreateForm: () => void;
  submitEditForm: () => void;
  initializeEditForm: (
    title: string,
    description: string,
    budget: number,
  ) => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
  createForm: {
    title: "",
    description: "",
    budget: "",
  },

  editForm: {
    title: "",
    description: "",
    budget: "",
  },

  setCreateFormField: (
    field: "title" | "description" | "budget",
    value: string,
  ) =>
    set((state) => ({
      createForm: {
        ...state.createForm,
        [field]: value,
      },
    })),

  setEditFormField: (
    field: "title" | "description" | "budget",
    value: string,
  ) =>
    set((state) => ({
      editForm: {
        ...state.editForm,
        [field]: value,
      },
    })),

  resetCreateForm: () =>
    set({
      createForm: {
        title: "",
        description: "",
        budget: "",
      },
    }),

  resetEditForm: () =>
    set({
      editForm: {
        title: "",
        description: "",
        budget: "",
      },
    }),

  initializeEditForm: (title: string, description: string, budget: number) =>
    set({
      editForm: {
        title,
        description,
        budget: budget.toString(),
      },
    }),

  submitCreateForm: () => {
    const { createForm, resetCreateForm } = get();
    const { title, description, budget } = createForm;

    if (!title.trim() || !description.trim() || !budget.trim()) {
      return;
    }

    const budgetNumber = Number.parseFloat(budget);
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      return;
    }

    // Get the project store actions
    const { addProject } = useProjectStore.getState();
    const { closeCreateModal } = useModalStore.getState();

    addProject(title.trim(), description.trim(), budgetNumber);
    closeCreateModal();
    resetCreateForm();
  },

  submitEditForm: () => {
    const { editForm, resetEditForm } = get();
    const { title, description, budget } = editForm;

    if (!title.trim() || !description.trim() || !budget.trim()) {
      return;
    }

    const budgetNumber = Number.parseFloat(budget);
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      return;
    }

    // Get the stores
    const { updateProject } = useProjectStore.getState();
    const { selectedProject, closeEditModal } = useModalStore.getState();

    if (!selectedProject) {
      return;
    }

    updateProject(
      selectedProject.id,
      title.trim(),
      description.trim(),
      budgetNumber,
    );
    closeEditModal();
    resetEditForm();
  },
}));
