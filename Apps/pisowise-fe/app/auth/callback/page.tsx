"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";
import { debugAuthConfig, debugUrlParams } from "@/lib/auth/debug";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleOAuthCallback } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        debugAuthConfig();
        const urlParams = debugUrlParams();

        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (errorParam) {
          throw new Error(errorDescription || `OAuth error: ${errorParam}`);
        }

        initializeAmplifyOAuth();

        await handleOAuthCallback();

        router.push("/projects");
      } catch (err: any) {
        console.error("Error during OAuth redirect:", err);
        setError(err.message || "Authentication failed");
        setIsProcessing(false);

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    };

    handleCallback();
  }, [router, handleOAuthCallback, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-md mx-auto p-6">
        {error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Authentication Error
            </h1>
            <p className="mb-4 text-gray-700">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to homepage in 5 seconds...</p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 border-4 border-t-[#246A49] border-r-[#246A49] border-b-[#246A49] border-l-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg">Completing authentication...</p>
            <p className="mt-2 text-sm text-gray-500">Please wait while we verify your credentials</p>
          </div>
        )}
      </div>
    </div>
  );
}
