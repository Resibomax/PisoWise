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
  const { isAuthenticated, isLoading, hasCheckedAuth, checkAuthState } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAmplifyOAuth();
    checkAuthState();
  }, [checkAuthState]);

  useEffect(() => {
    if (hasCheckedAuth && !isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [hasCheckedAuth, isAuthenticated, isLoading, router]);

  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#FBF5F3] border-r-[#FBF5F3] border-b-[#FBF5F3] border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-[#FBF5F3]">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
