"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";
import { debugAuthConfig } from "@/lib/auth/debug";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth";
import axios from "axios";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleOAuthCallback } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        debugAuthConfig();

        const errorParam = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (errorParam) {
          throw new Error(errorDescription || `OAuth error: ${errorParam}`);
        }

        initializeAmplifyOAuth();
        setProgress(25);

        setTimeout(() => setProgress(50), 300);
        setTimeout(() => setProgress(75), 600);

        await handleOAuthCallback();
        setProgress(100);

        const session = await fetchAuthSession();
        const user = await getCurrentUser();
        const token = session.tokens?.idToken?.toString();

        const email =
          (user as any)?.attributes?.email ||
          user.signInDetails?.loginId ||
          (session.tokens?.idToken as any)?.payload?.email;

        if (!email) {
          throw new Error("User email is missing from all known sources.");
        }

        const payload = {
          email,
          username: email.split("@")[0],
        };

        console.log("Checking if user already exists:", email);

        const checkRes = await axios.get(
          "https://8x7vhw6k4m.execute-api.ap-southeast-1.amazonaws.com/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users = checkRes.data as Array<{ email: string }>;
        const userExists = users.some((u) => u.email === email);

        if (userExists) {
          console.log("User already exists, skipping POST.");
        } else {
          console.log("User not found, creating new user...");

          const response = await axios.post(
            "https://8x7vhw6k4m.execute-api.ap-southeast-1.amazonaws.com/users",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("User created:", response.data);
        }

        setTimeout(() => {
          router.push("/projects");
        }, 800);
      } catch (err: any) {
        let errorMessage = "Authentication failed";

        if (axios.isAxiosError(err)) {
          if (err.response) {
            console.error("API Error Response:", {
              status: err.response.status,
              data: err.response.data,
              headers: err.response.headers,
            });

            errorMessage =
              err.response.data?.message ||
              err.response.data?.error ||
              JSON.stringify(err.response.data) ||
              `Request failed with status ${err.response.status}`;
          } else if (err.request) {
            console.error("No response received:", err.request);
            errorMessage = "No response from the server.";
          } else {
            console.error("Axios setup error:", err.message);
            errorMessage = err.message;
          }
        } else if (err instanceof Error) {
          console.error("General error:", err.message);
          errorMessage = err.message;
        }

        setError(errorMessage);

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    };

    handleCallback();
  }, [router, handleOAuthCallback, searchParams]);
  return (
    <div
      className="relative h-screen font-[Ember] flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/bg-lines.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      {/* Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 font-semibold text-[#FBF5F3] flex items-center justify-center text-xl">
          Logo
        </div>
      </div>

      {/* Main content */}
      <div className="bg-[#FBF5F3] p-8 rounded-[12px] shadow-lg w-[90%] max-w-md mx-4">
        {error ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="font-Ember font-medium text-[24px] tracking-[0.48px] text-[#123524] mb-4">
              Authentication Error
            </h1>
            <p className="text-[#123524] text-[16px] mb-6 leading-relaxed">
              {error}
            </p>
            <div className="text-sm text-gray-600">
              Redirecting to homepage in 5 seconds...
            </div>

            {/* Progress bar for redirect */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-red-500 h-1 rounded-full transition-all duration-1000"
                style={{
                  width: "100%",
                  animation: "shrink 5s linear forwards",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {progress === 100 ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-[#246A49] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-[#246A49]">
                      {progress}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            <h1 className="font-Ember font-medium text-[24px] tracking-[0.48px] text-[#123524] mb-4">
              {progress === 100
                ? "Authentication Successful!"
                : "Completing Authentication"}
            </h1>

            <p className="text-[#123524] text-[16px] mb-6 leading-relaxed">
              {progress === 100
                ? "Welcome to PisoWise! Redirecting you to your dashboard..."
                : "Please wait while we verify your credentials and set up your account."}
            </p>

            {/* Progress bar - hidden on mobile */}
            <div className="hidden md:block w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-[#246A49] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Progress steps - hidden on mobile */}
            <div className="hidden md:flex justify-between text-xs text-gray-600 mb-4">
              <span
                className={progress >= 25 ? "text-[#246A49] font-medium" : ""}
              >
                Initializing
              </span>
              <span
                className={progress >= 50 ? "text-[#246A49] font-medium" : ""}
              >
                Verifying
              </span>
              <span
                className={progress >= 75 ? "text-[#246A49] font-medium" : ""}
              >
                Processing
              </span>
              <span
                className={progress >= 100 ? "text-[#246A49] font-medium" : ""}
              >
                Complete
              </span>
            </div>

            {progress === 100 && (
              <div className="text-sm text-gray-600">
                Redirecting in a moment...
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

export const dynamic = "force-dynamic";
