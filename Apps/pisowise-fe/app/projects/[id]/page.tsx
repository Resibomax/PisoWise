"use client"

import { useParams, useRouter } from "next/navigation"
import { useProjectStore } from "@/app/store/projectsPage/projectStore"
import { useModalStore } from "@/app/store/projectsPage/modalStore"
import { EditProjectModal } from "../components/modals/EditprojectModal"
import { useEffect, useState } from "react"
import type { Project } from "@/app/projects/mockProject"

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { getProjectById } = useProjectStore()
  const { openEditModal } = useModalStore()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundProject = getProjectById(params.id as string)
      setProject(foundProject || null)
      setLoading(false)
    }
  }, [params.id, getProjectById])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return (
      <div>
        <h1>Project Not Found</h1>
        <button onClick={() => router.push("/projects")}>Back to Projects</button>
      </div>
    )
  }

  const remainingBudget = project.budget - project.spent
  const budgetPercentage = (project.spent / project.budget) * 100

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 p-4 md:px-8 lg:px-16 text-white">
      <div>
        <button onClick={() => router.back()}>Back</button>
        <h1>{project.title}</h1>
        <button onClick={() => openEditModal(project)}>Edit Project</button>
      </div>

      <div>
        <h2>Description</h2>
        <p>{project.description}</p>
      </div>

      <div>
        <h2>Budget Overview</h2>
        <p>Total Budget: ${project.budget}</p>
        <p>Spent: ${project.spent}</p>
        <p>Remaining: ${remainingBudget}</p>
        <p>Budget Usage: {budgetPercentage.toFixed(1)}%</p>
      </div>

      <div>
        <h2>Project Status</h2>
        <p>Project ID: {project.id}</p>
      </div>

      <div>
        <button onClick={() => router.push("/projects")}>Back to Projects</button>
      </div>

      <EditProjectModal />
    </div>
  )
}