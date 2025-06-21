"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { checkAuthState } = useAuthStore();

  useEffect(() => {
    initializeAmplifyOAuth();

    const handleOAuthCallback = async () => {
      try {
        await checkAuthState();

        router.push("/projects");
      } catch (err: any) {
        console.error("Error during OAuth redirect:", err);
        setError(err.message || "Authentication failed");

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [router, checkAuthState]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Authentication Error
            </h1>
            <p className="mb-4">{error}</p>
            <p>Redirecting to homepage...</p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 border-4 border-t-[#246A49] border-r-[#246A49] border-b-[#246A49] border-l-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg">Completing authentication...</p>
          </div>
        )}
      </div>
    </div>
  );
}
