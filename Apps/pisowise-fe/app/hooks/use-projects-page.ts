"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useUserStore } from "../store/user-store";
import { useProjectsStore } from "../store/projects-store";

export const useProjectsPage = () => {
  const auth = useAuthStore();
  const user = useUserStore();
  const projects = useProjectsStore();

  useEffect(() => {
    auth.initializeAuth();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.email) {
      user.fetchDatabaseUser(auth.user.email);
    } else {
      user.clearUser();
      projects.clearProjects();
    }
  }, [auth.isAuthenticated, auth.user?.email]);

  useEffect(() => {
    if (user.dbUser?.user_id) {
      projects.fetchProjects(user.dbUser.user_id);
    }
  }, [user.dbUser?.user_id]);

  const isLoading = auth.isLoading || user.isLoading || projects.isLoading;
  const error = auth.error || user.error || projects.error;

  const refetchProjects = async () => {
    if (user.dbUser?.user_id) {
      await projects.refetchProjects(user.dbUser.user_id);
    }
  };

  return {
    // States
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    dbUser: user.dbUser,
    projects: projects.projects,
    isLoading,
    error,

    // Actions
    refetchProjects,
    signOut: auth.signOut,
  };
};
