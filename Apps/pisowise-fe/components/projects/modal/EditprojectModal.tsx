"use client";

import type React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/app/store/project/modal-store";
import { useFormStore } from "@/app/store/project/form-store";

export function EditProjectModal() {
  const { isEditModalOpen, selectedProject, closeEditModal } = useModalStore();
  const {
    editForm,
    setEditFormField,
    submitEditForm,
    resetEditForm,
    initializeEditForm,
  } = useFormStore();

  // Initialize form when modal opens with a selected project
  useEffect(() => {
    if (isEditModalOpen && selectedProject) {
      initializeEditForm(
        selectedProject.name,
        selectedProject.description,
        selectedProject.budget,
      );
    }
  }, [isEditModalOpen, selectedProject, initializeEditForm]);

  const handleClose = () => {
    resetEditForm();
    closeEditModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEditForm();
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] font-roboto-light text-[14px] [&_input]:selection:bg-blue-500 [&_input]:selection:text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-left font-[Ember] text-[24px]">
              Edit Project
            </DialogTitle>
            <DialogDescription className="text-left">
              Make changes to your project. Click &rdquo;Save Changes&rdquo;
              when you&rsquo;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditFormField("title", e.target.value)}
                className="selection:bg-blue-500 selection:text-white text-[#8B8483]"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                value={editForm.budget}
                onChange={(e) => setEditFormField("budget", e.target.value)}
                min="0"
                step="0.01"
                className="selection:bg-blue-500 selection:text-white text-[#8B8483]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editForm.description}
                onChange={(e) =>
                  setEditFormField("description", e.target.value)
                }
                className="h-[80px] selection:bg-blue-500 selection:text-white text-[#8B8483]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#246A49] hover:bg-[#349868] rounded-[12px] w-full"
            >
              Done
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
