import { create } from "zustand";
import { useProjectsStore } from "./projects-store";
import { useModalStore } from "./modal-store";
import { useUserStore } from "./user-store";
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  budget: string;
}

interface FormStore {
  createForm: FormData;
  editForm: FormData;
  setCreateFormField: (field: keyof FormData, value: string) => void;
  setEditFormField: (field: keyof FormData, value: string) => void;
  resetCreateForm: () => void;
  resetEditForm: () => void;
  submitCreateForm: () => Promise<void>;
  submitEditForm: () => void;
  initializeEditForm: (
    title: string,
    description: string,
    budget: number,
  ) => void;
}

const initialForm: FormData = { title: "", description: "", budget: "" };

export const useFormStore = create<FormStore>((set, get) => ({
  createForm: initialForm,
  editForm: initialForm,

  setCreateFormField: (field, value) =>
    set((state) => ({
      createForm: { ...state.createForm, [field]: value },
    })),

  setEditFormField: (field, value) =>
    set((state) => ({
      editForm: { ...state.editForm, [field]: value },
    })),

  resetCreateForm: () => set({ createForm: initialForm }),
  resetEditForm: () => set({ editForm: initialForm }),

  initializeEditForm: (title, description, budget) =>
    set({
      editForm: { title, description, budget: budget.toString() },
    }),

  submitCreateForm: async () => {
    const { createForm, resetCreateForm } = get();
    const { title, description, budget } = createForm;

    // Validation
    if (!title.trim() || !description.trim() || !budget.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const budgetNumber = Number.parseFloat(budget);
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }

    // Get required data
    const { addProject } = useProjectsStore.getState();
    const { closeCreateModal } = useModalStore.getState();
    const { dbUser } = useUserStore.getState();

    if (!dbUser?.user_id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    // Submit project
    const newProject = {
      name: title.trim(),
      description: description.trim(),
      budget: budgetNumber,
      amount_spent: 0,
    };

    try {
      await addProject(newProject, dbUser.user_id);
      closeCreateModal();
      resetCreateForm();
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  },

  submitEditForm: () => {
    const { editForm, resetEditForm } = get();
    const { title, description, budget } = editForm;

    if (!title.trim() || !description.trim() || !budget.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const budgetNumber = Number.parseFloat(budget);
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }

    const { updateProject } = useProjectsStore.getState();
    const { selectedProject, closeEditModal } = useModalStore.getState();

    if (!selectedProject) return;

    updateProject(selectedProject.id, {
      name: title.trim(),
      description: description.trim(),
      budget: budgetNumber,
    });

    closeEditModal();
    resetEditForm();
  },
}));
