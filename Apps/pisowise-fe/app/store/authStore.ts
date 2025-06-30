import { create } from "zustand";
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  getCurrentUser,
  fetchUserAttributes,
  resetPassword,
  confirmResetPassword,
  signInWithRedirect,
} from "aws-amplify/auth";
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";
import { handleOAuthCallback } from "@/lib/auth/oauth-handler";
import { fetchAuthSession } from "@aws-amplify/core";
import axios from "axios";

interface User {
  email: string;
  sub: string;
  picture?: string;
  attributes?: Record<string, string | undefined>;
}

function isErrorWithMessage(err: unknown): err is { message: string } {
  return typeof err === "object" && err !== null && "message" in err;
}

interface AuthStore {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isVerificationOpen: boolean;
  isResetPasswordOpen: boolean;
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  hasCheckedAuth: boolean;
  error: string | null;
  verificationEmail: string;
  isPasswordReset: boolean;

  openLogin: () => void;
  closeLogin: () => void;
  openSignup: () => void;
  closeSignup: () => void;
  openVerification: (email: string) => void;
  closeVerification: () => void;
  openResetPassword: (email: string) => void;
  closeResetPassword: () => void;
  switchToSignup: () => void;
  switchToLogin: () => void;

  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<boolean>;
  verifyAccount: (email: string, code: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  confirmForgotPassword: (
    email: string,
    code: string,
    newPassword: string,
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  checkAuthState: () => Promise<void>;
  handleOAuthCallback: () => Promise<void>;
  clearError: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  isVerificationOpen: false,
  isResetPasswordOpen: false,
  isLoading: false,
  user: null,
  isAuthenticated: false,
  hasCheckedAuth: false,
  error: null,
  verificationEmail: "",
  isPasswordReset: false,

  openLogin: () =>
    set({
      isLoginOpen: true,
      isSignupOpen: false,
      isVerificationOpen: false,
      isResetPasswordOpen: false,
      error: null,
    }),
  closeLogin: () => set({ isLoginOpen: false, error: null }),
  openSignup: () =>
    set({
      isSignupOpen: true,
      isLoginOpen: false,
      isVerificationOpen: false,
      isResetPasswordOpen: false,
      error: null,
    }),
  closeSignup: () => set({ isSignupOpen: false, error: null }),
  openVerification: (email) =>
    set({
      isVerificationOpen: true,
      isLoginOpen: false,
      isSignupOpen: false,
      isResetPasswordOpen: false,
      error: null,
      verificationEmail: email,
    }),
  closeVerification: () => set({ isVerificationOpen: false, error: null }),
  openResetPassword: (email) =>
    set({
      isResetPasswordOpen: true,
      isLoginOpen: false,
      isSignupOpen: false,
      isVerificationOpen: false,
      error: null,
      verificationEmail: email,
    }),
  closeResetPassword: () => set({ isResetPasswordOpen: false, error: null }),
  switchToSignup: () =>
    set({
      isSignupOpen: true,
      isLoginOpen: false,
      isVerificationOpen: false,
      isResetPasswordOpen: false,
      error: null,
    }),
  switchToLogin: () =>
    set({
      isLoginOpen: true,
      isSignupOpen: false,
      isVerificationOpen: false,
      isResetPasswordOpen: false,
      error: null,
    }),
  clearError: () => set({ error: null }),

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { isSignedIn } = await signIn({ username: email, password });

      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

        // Prepare payload
        const userPayload = {
          email: attributes?.email ?? email,
          username: (attributes?.email ?? email).split("@")[0],
        };

        try {
          await axios.post(`${API_URL}/users`, userPayload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          });
          console.log("Internal user pushed to DB");
        } catch (pushErr: unknown) {
          if (axios.isAxiosError(pushErr) && pushErr.response?.status === 409) {
            console.log("User already exists in DB, skipping POST");
          } else {
            console.error("Error pushing user to DB:", pushErr);
          }
        }

        set({
          user: {
            email: userPayload.email,
            sub: currentUser.userId,
            attributes,
          },
          isAuthenticated: true,
          isLoading: false,
          isLoginOpen: false,
          hasCheckedAuth: true,
        });
      }
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to sign in";
      console.error("Error signing in:", err);
      set({ error: message, isLoading: false });
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      initializeAmplifyOAuth();
      await signInWithRedirect({ provider: "Google" });
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to sign in with Google";
      console.error("Error signing in with Google:", err);
      set({ error: message, isLoading: false });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      set({ isLoading: false, isSignupOpen: false, verificationEmail: email });
      return true;
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to sign up";
      console.error("Error signing up:", err);
      set({ error: message, isLoading: false });
      return false;
    }
  },

  verifyAccount: async (email, code) => {
    set({ isLoading: true, error: null });
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      set({ isLoading: false, isVerificationOpen: false, isLoginOpen: true });
      return true;
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to verify account";
      console.error("Error verifying account:", err);
      set({ error: message, isLoading: false });
      return false;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await resetPassword({ username: email });
      set({
        isLoading: false,
        isPasswordReset: true,
        verificationEmail: email,
      });
      return true;
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to request password reset";
      console.error("Error requesting password reset:", err);
      set({ error: message, isLoading: false });
      return false;
    }
  },

  confirmForgotPassword: async (email, code, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
      set({
        isLoading: false,
        isResetPasswordOpen: false,
        isLoginOpen: true,
        isPasswordReset: false,
      });
      return true;
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to reset password";
      console.error("Error confirming password reset:", err);
      set({ error: message, isLoading: false });
      return false;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await signOut();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
      });
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Failed to sign out";
      console.error("Error signing out:", err);
      set({ error: message, isLoading: false });
    }
  },

  checkAuthState: async () => {
    const state = get();
    if (state.isLoading || state.hasCheckedAuth) return;

    set({ isLoading: true });
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      set({
        user: {
          email: attributes?.email ?? "",
          sub: currentUser.userId,
          attributes,
        },
        isAuthenticated: true,
        isLoading: false,
        hasCheckedAuth: true,
      });
    } catch {
      console.log("Auth check result: User not authenticated");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
      });
    }
  },

  handleOAuthCallback: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await handleOAuthCallback();
      if (result.success && result.user) {
        set({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          hasCheckedAuth: true,
          error: null,
        });
      } else {
        throw new Error(result.error || "OAuth callback failed");
      }
    } catch (err: unknown) {
      const message = isErrorWithMessage(err)
        ? err.message
        : "Authentication failed";
      console.error("OAuth callback error:", err);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
        error: message,
      });
      throw err;
    }
  },
}));
