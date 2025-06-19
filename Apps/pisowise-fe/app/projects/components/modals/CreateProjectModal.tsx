"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModalStore } from "@/app/store/projectsPage/modalStore"
import { useFormStore } from "@/app/store/projectsPage/formStore"

export function CreateProjectModal() {
  const { isCreateModalOpen, closeCreateModal } = useModalStore()
  const { createForm, setCreateFormField, submitCreateForm, resetCreateForm } = useFormStore()

  const handleClose = () => {
    resetCreateForm()
    closeCreateModal()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitCreateForm()
  }

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] font-roboto-light text-[14px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-left font-[Ember] text-[24px]">Create Project</DialogTitle>
            <DialogDescription className="text-left">
              Ready to proceed? Click "Done" to create your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                value={createForm.title}
                onChange={(e) => setCreateFormField("title", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                value={createForm.budget}
                onChange={(e) => setCreateFormField("budget", e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={createForm.description}
                onChange={(e) => setCreateFormField("description", e.target.value)}
                className="h-[80px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#246A49] hover:bg-[#349868] rounded-[12px] w-full">
              Done
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
