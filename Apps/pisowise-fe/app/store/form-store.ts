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
  isSubmitting: boolean;
  setCreateFormField: (field: keyof FormData, value: string) => void;
  setEditFormField: (field: keyof FormData, value: string) => void;
  resetCreateForm: () => void;
  resetEditForm: () => void;
  submitCreateForm: () => Promise<void>;
  submitEditForm: () => Promise<void>;
  initializeEditForm: (
    title: string,
    description: string,
    budget: number,
  ) => void;
}

const initialForm: FormData = { title: "", description: "", budget: "" };

const validateForm = (form: FormData) => {
  const { title, description, budget } = form;

  if (!title.trim() || !description.trim() || !budget.trim()) {
    toast.error("Please fill in all fields");
    return false;
  }

  const budgetNumber = Number.parseFloat(budget);
  if (isNaN(budgetNumber) || budgetNumber <= 0) {
    toast.error("Please enter a valid budget amount");
    return false;
  }

  return { budgetNumber };
};

export const useFormStore = create<FormStore>((set, get) => ({
  createForm: initialForm,
  editForm: initialForm,
  isSubmitting: false,

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
    const validation = validateForm(createForm);

    if (!validation) return;

    const { dbUser } = useUserStore.getState();
    if (!dbUser?.user_id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    set({ isSubmitting: true });

    try {
      const { addProject } = useProjectsStore.getState();
      const { closeCreateModal } = useModalStore.getState();

      const newProject = {
        name: createForm.title.trim(),
        description: createForm.description.trim(),
        budget: validation.budgetNumber,
        amount_spent: 0,
      };

      await addProject(newProject, dbUser.user_id);
      closeCreateModal();
      resetCreateForm();
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      set({ isSubmitting: false });
    }
  },

  submitEditForm: async () => {
    const { editForm, resetEditForm } = get();
    const validation = validateForm(editForm);

    if (!validation) return;

    const { selectedProject, closeEditModal } = useModalStore.getState();
    if (!selectedProject) return;

    set({ isSubmitting: true });

    try {
      const { updateProject } = useProjectsStore.getState();

      const updates = {
        name: editForm.title.trim(),
        description: editForm.description.trim(),
        budget: validation.budgetNumber,
      };

      updateProject(selectedProject.project_id, updates);
      closeEditModal();
      resetEditForm();
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
