"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProjectsPageComponent from "./components/ProjectsPage";

export default function ProjectsPageContainer() {
  return (
    <ProtectedRoute>
      <ProjectsPageComponent />
    </ProtectedRoute>
  );
}
