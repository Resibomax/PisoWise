"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, checkAuthState } = useAuthStore();
  const router = useRouter();

  // Initialize Amplify
  useEffect(() => {
    initializeAmplifyOAuth();
  }, []);

  // Check authentication on mount
  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Redirect if not authenticated - redirect to landing page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#246A49] border-r-[#246A49] border-b-[#246A49] border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
