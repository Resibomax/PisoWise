"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, hasCheckedAuth, checkAuthState } = useAuthStore();
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
          <div className="w-16 h-16 border-4 border-t-[#246A49] border-r-[#246A49] border-b-[#246A49] border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
