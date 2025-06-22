"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useAuthStore } from "./store/authStore";
import LogInModal from "./landing/components/modals/LogInModal";
import SignUpModal from "./landing/components/modals/SignUpModal";
import VerificationModal from "./landing/components/modals/VerificationModal";
import ResetPasswordModal from "./landing/components/modals/ResetPasswordModal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";

export default function Landing() {
  const {
    openSignup,
    openLogin,
    isLoginOpen,
    isSignupOpen,
    isVerificationOpen,
    isResetPasswordOpen,
    closeLogin,
    closeSignup,
    closeVerification,
    closeResetPassword,
    checkAuthState,
    isAuthenticated,
    isLoading,
  } = useAuthStore();
  
  const router = useRouter();

  useEffect(() => {
    initializeAmplifyOAuth();
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/projects");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div
      className="relative h-screen font-[Ember]"
      style={{
        backgroundImage: "url('/assets/bg-lines.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      {/* Logo placeholder */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 font-semibold text-[#FBF5F3] flex items-center justify-center">
          Logo
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center text-[40px] font-bold leading-[45px] tracking-[-0.4px] text-[#FBF5F3]">
          <span className="block md:inline">Snap</span>{" "}
          <span className="block md:inline">Receipts.</span>
          <br className="hidden md:block" />
          <span className="block md:inline">Track</span>{" "}
          <span className="block md:inline">Smarter.</span>
        </div>
        <div className="text-center mt-2">
          <Button
            onClick={openSignup}
            className="mt-4 text-[#123524] text-[16px] md:w-[376px]"
            variant="outline"
            size="lg"
          >
            Create Account
          </Button>
          <br />
          <Button
            onClick={openLogin}
            className="mt-4 text-[#FBF5F3] text-[16px] md:w-[376px]"
            variant="soft"
            size="lg"
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Render modals via Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={closeLogin}>
        {isLoginOpen && <LogInModal onClose={closeLogin} />}
      </Dialog>
      <Dialog open={isSignupOpen} onOpenChange={closeSignup}>
        {isSignupOpen && <SignUpModal onClose={closeSignup} />}
      </Dialog>
      <Dialog open={isVerificationOpen} onOpenChange={closeVerification}>
        {isVerificationOpen && <VerificationModal onClose={closeVerification} />}
      </Dialog>
      <Dialog open={isResetPasswordOpen} onOpenChange={closeResetPassword}>
        {isResetPasswordOpen && <ResetPasswordModal onClose={closeResetPassword} />}
      </Dialog>
    </div>
  );
}
