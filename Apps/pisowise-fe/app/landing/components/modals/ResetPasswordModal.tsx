"use client";

import { useState, useEffect } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/authStore";

export default function ResetPasswordModal({ onClose }: { onClose: () => void }) {
  const { 
    forgotPassword, 
    confirmForgotPassword, 
    isLoading, 
    error, 
    verificationEmail, 
    isPasswordReset,
    switchToLogin 
  } = useAuthStore();
  
  const [email, setEmail] = useState(verificationEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [step, setStep] = useState(isPasswordReset ? 2 : 1);

  // Update email when verificationEmail changes
  useEffect(() => {
    setEmail(verificationEmail);
  }, [verificationEmail]);

  // Update step when isPasswordReset changes
  useEffect(() => {
    if (isPasswordReset) {
      setStep(2);
    }
  }, [isPasswordReset]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    const success = await forgotPassword(email);
    if (success) {
      setStep(2);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    
    await confirmForgotPassword(email, code, newPassword);
  };

  return (
    <DialogContent className="bg-[#FBF5F3] p-6 rounded-[12px] shadow-lg w-[90%] max-w-md pt-10">
      <DialogTitle className="sr-only">Reset Password</DialogTitle>

      {step === 1 ? (
        <form onSubmit={handleRequestReset}>
          <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-center mb-4">
            Reset Your Password
          </div>
          
          <p className="text-center mb-4">
            Enter your email address and we'll send you a code to reset your password.
          </p>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? "Sending..." : "Send Reset Code"}
          </Button>
          
          <div className="mt-4 text-center">
            <button 
              type="button"
              onClick={switchToLogin}
              className="text-[#246A49] hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirmReset}>
          <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-center mb-4">
            Set New Password
          </div>
          
          <p className="text-center mb-4">
            Enter the verification code sent to your email and your new password.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly
            />
          </div>
          
          <div className="mt-2">
            <p>Verification Code</p>
            <Input
              className="w-full mt-1.5 bg-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          
          <div className="mt-2">
            <p>New Password</p>
            <Input
              className="w-full mt-1.5 bg-white"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mt-2">
            <p>Confirm New Password</p>
            <Input
              className="w-full mt-1.5 bg-white"
              type="password"
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
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
          
          <div className="mt-4 text-center">
            <button 
              type="button"
              onClick={switchToLogin}
              className="text-[#246A49] hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </DialogContent>
  );
}
