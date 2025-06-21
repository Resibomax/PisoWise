"use client";

import { useState, useEffect } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/authStore";

export default function VerificationModal({ onClose }: { onClose: () => void }) {
  const { verifyAccount, isLoading, error, verificationEmail, switchToLogin } = useAuthStore();
  const [email, setEmail] = useState(verificationEmail);
  const [code, setCode] = useState("");

  // Update email when verificationEmail changes
  useEffect(() => {
    setEmail(verificationEmail);
  }, [verificationEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyAccount(email, code);
  };

  return (
    <DialogContent className="bg-[#FBF5F3] p-6 rounded-[12px] shadow-lg w-[90%] max-w-md pt-10">
      <DialogTitle className="sr-only">Verify Account</DialogTitle>

      <form onSubmit={handleSubmit}>
        <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-center mb-4">
          Verify Your Account
        </div>
        
        <p className="text-center mb-4">
          Enter the verification code sent to your email address.
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
        
        <div className="mt-2">
          <p>Verification Code</p>
          <Input
            className="w-full mt-1.5 bg-white"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
          {isLoading ? "Verifying..." : "Verify Account"}
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
    </DialogContent>
  );
}
