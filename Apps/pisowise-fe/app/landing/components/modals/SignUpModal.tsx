"use client";

import { useState } from "react";
import { Google as GoogleIcon } from "@mui/icons-material";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/authStore";

export default function SignUpModal({}: { onClose: () => void }) {
  const {
    signUp,
    signInWithGoogle,
    isLoading,
    error,
    openVerification,
    switchToLogin,
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const success = await signUp(email, password);
    if (success) {
      openVerification(email);
    }
  };

  const handleGoogleSignUp = async () => {
    console.log("Initiating Google sign-up...");
    try {
      await signInWithGoogle();
      console.log("Google sign-up initiated successfully");
    } catch (error) {
      console.error("Error initiating Google sign-up:", error);
    }
  };

  return (
    <DialogContent className="bg-[#FBF5F3] p-6 rounded-[12px] shadow-lg w-[90%] max-w-md pt-10">
      <DialogTitle className="sr-only">Create Account</DialogTitle>

      <form onSubmit={handleSubmit}>
        <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-left mb-2">
          Create Account
        </div>
        <p className="font-roboto-light text-[14px] text-[#8B8483] leading-5 mb-2">
          Enter your email and password or continue with your google account.
        </p>

        {(error || localError) && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error || localError}
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-2">
          <p>Confirm Password</p>
          <Input
            className="w-full mt-1.5 bg-white"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
          variant="outline"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create"}
        </Button>

        <div className="flex items-center gap-4 my-1">
          <hr className="flex-grow border-t border-[#8B8483]" />
          <span className="text-[#8B8483] text-[16px] font-medium">or</span>
          <hr className="flex-grow border-t border-[#8B8483]" />
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
          variant="outline"
          size="lg"
          disabled={isLoading}
        >
          <GoogleIcon />
          Create with Google
        </Button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={switchToLogin}
            className="text-[#246A49] hover:underline"
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </DialogContent>
  );
}
