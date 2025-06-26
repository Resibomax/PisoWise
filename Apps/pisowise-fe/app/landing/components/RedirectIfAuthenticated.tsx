"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";
import Loader from "@/components/ui/loader";

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
    return <Loader />;
  }

  return !isAuthenticated ? <>{children}</> : null;
}
