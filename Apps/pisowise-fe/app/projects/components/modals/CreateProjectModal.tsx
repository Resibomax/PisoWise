"use client"

import type React from "react"

import { useState } from "react"
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

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string, description: string, budget: number) => void
}

export function CreateProjectModal({ isOpen, onClose, onCreate }: CreateProjectModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !budget.trim()) {
      return
    }

    const budgetNumber = Number.parseFloat(budget)
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      return
    }

    onCreate(title.trim(), description.trim(), budgetNumber)
    // Reset form
    setTitle("")
    setDescription("")
    setBudget("")
    onClose()
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-[80px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#246A49] rounded-[12px]">Done</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}



