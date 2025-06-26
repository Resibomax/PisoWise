"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProjectsPageComponent from "@/components/projects/ProjectsPage";
import { useAuthStore } from "@/app/store/authStore";
import { Button } from "@/components/ui/button";

export default function ProjectsPageContainer() {
  return (
    <ProtectedRoute>
      <ProjectsPageComponent />
    </ProtectedRoute>
  );
}
