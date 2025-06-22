"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";

export default function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, hasCheckedAuth, checkAuthState } =
    useAuthStore();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        initializeAmplifyOAuth();
        await new Promise((resolve) => setTimeout(resolve, 50));
        setIsInitialized(true);
        await checkAuthState();
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsInitialized(true);
      }
    };

    if (!isInitialized && !hasCheckedAuth) {
      initializeAuth();
    }

    const timeout = setTimeout(() => {
      setTimeoutReached(true);
      console.warn("Auth check timeout reached, showing content");
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasCheckedAuth && isAuthenticated) {
      router.replace("/projects");
    }
  }, [hasCheckedAuth, isAuthenticated, router]);

  if ((!isInitialized || isLoading || !hasCheckedAuth) && !timeoutReached) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#246A49] border-r-[#246A49] border-b-[#246A49] border-l-transparent rounded-full animate-spin mx-auto text-white"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return !isAuthenticated ? <>{children}</> : null;
}
