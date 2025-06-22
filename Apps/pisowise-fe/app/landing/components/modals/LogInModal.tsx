"use client";

import { useState } from "react";
import { Google as GoogleIcon } from "@mui/icons-material";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/authStore";

export default function LogInModal({}: { onClose: () => void }) {
  const {
    signIn,
    signInWithGoogle,
    isLoading,
    error,
    openResetPassword,
    switchToSignup,
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleGoogleSignIn = async () => {
    console.log("Initiating Google sign-in...");
    try {
      await signInWithGoogle();
      console.log("Google sign-in initiated successfully");
    } catch (error) {
      console.error("Error initiating Google sign-in:", error);
    }
  };

  const handleForgotPassword = () => {
    // Open reset password modal
    if (!email) {
      alert("Please enter your email address first");
      return;
    }
    openResetPassword(email);
  };

  return (
    <DialogContent className="bg-[#FBF5F3] p-6 rounded-[12px] shadow-lg w-[90%] max-w-md pt-10">
      <DialogTitle className="sr-only">Login Modal</DialogTitle>

      <form onSubmit={handleSubmit}>
        <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-center">
          Log In to PisoWise
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
          variant="outline"
          size="lg"
          disabled={isLoading}
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <hr className="my-4 border-t-1 border-[#8B8483]" />

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <div>
          <p>Email</p>
          <Input
            className="w-full mt-1.5 bg-white"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-2">
          <p>Password</p>
          <Input
            className="w-full mt-1.5 bg-white"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-1 text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-[#246A49] hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
          variant="outline"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={switchToSignup}
            className="text-[#246A49] hover:underline"
          >
            Don&rsquo;t have an account? Sign up
          </button>
        </div>
      </form>
    </DialogContent>
  );
}
