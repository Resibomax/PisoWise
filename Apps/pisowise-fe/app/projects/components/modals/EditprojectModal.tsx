"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import type { Project } from "../../mockProject"


interface EditProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (id: string, title: string, description: string, budget: number) => void
  project: Project | null
}

export function EditProjectModal({ isOpen, onClose, onEdit, project }: EditProjectModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")

  // Pre-populate form when project changes or modal opens
  useEffect(() => {
    if (project && isOpen) {
      setTitle(project.title)
      setDescription(project.description)
      setBudget(project.budget.toString())
    }
  }, [project, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!project || !title.trim() || !description.trim() || !budget.trim()) {
      return
    }

    const budgetNumber = Number.parseFloat(budget)
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      return
    }

    onEdit(project.id, title.trim(), description.trim(), budgetNumber)

    // Reset form
    setTitle("")
    setDescription("")
    setBudget("")
  }

  const handleClose = () => {
    // Reset form when closing
    setTitle("")
    setDescription("")
    setBudget("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] font-roboto-light text-[14px] [&_input]:selection:bg-blue-500 [&_input]:selection:text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-left font-[Ember] text-[24px]">Edit Project</DialogTitle>
            <DialogDescription className="text-left">
              Make changes to your project. Click "Save Changes" when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="selection:bg-blue-500 selection:text-white"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="0"
                step="0.01"
                className="selection:bg-blue-500 selection:text-white"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-[80px] selection:bg-blue-500 selection:text-white"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#246A49] rounded-[12px]">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
