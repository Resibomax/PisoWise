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
  signInWithRedirect
} from 'aws-amplify/auth';
import { initializeAmplifyOAuth } from "@/lib/auth/amplify-oauth";
import { handleOAuthCallback } from "@/lib/auth/oauth-handler";

interface User {
  email: string;
  sub: string;
  attributes?: any;
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

  // Modal controls
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

  // Auth actions
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<boolean>;
  verifyAccount: (email: string, code: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  checkAuthState: () => Promise<void>;
  handleOAuthCallback: () => Promise<void>;
  clearError: () => void;
}

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
  verificationEmail: '',
  isPasswordReset: false,

  // Modal controls
  openLogin: () => set({ isLoginOpen: true, isSignupOpen: false, isVerificationOpen: false, isResetPasswordOpen: false, error: null }),
  closeLogin: () => set({ isLoginOpen: false, error: null }),
  openSignup: () => set({ isSignupOpen: true, isLoginOpen: false, isVerificationOpen: false, isResetPasswordOpen: false, error: null }),
  closeSignup: () => set({ isSignupOpen: false, error: null }),
  openVerification: (email) => set({ isVerificationOpen: true, isLoginOpen: false, isSignupOpen: false, isResetPasswordOpen: false, error: null, verificationEmail: email }),
  closeVerification: () => set({ isVerificationOpen: false, error: null }),
  openResetPassword: (email) => set({ isResetPasswordOpen: true, isLoginOpen: false, isSignupOpen: false, isVerificationOpen: false, error: null, verificationEmail: email }),
  closeResetPassword: () => set({ isResetPasswordOpen: false, error: null }),
  switchToSignup: () => set({ isSignupOpen: true, isLoginOpen: false, isVerificationOpen: false, isResetPasswordOpen: false, error: null }),
  switchToLogin: () => set({ isLoginOpen: true, isSignupOpen: false, isVerificationOpen: false, isResetPasswordOpen: false, error: null }),
  clearError: () => set({ error: null }),

  // Auth actions
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        set({
          user: {
            email: attributes?.email ?? email,
            sub: currentUser.userId,
            attributes
          },
          isAuthenticated: true,
          isLoading: false,
          isLoginOpen: false,
          hasCheckedAuth: true
        });
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      set({ error: error.message || 'Failed to sign in', isLoading: false });
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });

    try {
      initializeAmplifyOAuth(); 

      await signInWithRedirect({ provider: 'Google' });

    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      set({ 
        error: error.message || 'Failed to sign in with Google', 
        isLoading: false 
      });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } }
      });
      set({ isLoading: false, isSignupOpen: false, verificationEmail: email });
      return true;
    } catch (error: any) {
      console.error('Error signing up:', error);
      set({ error: error.message || 'Failed to sign up', isLoading: false });
      return false;
    }
  },

  verifyAccount: async (email, code): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      set({ isLoading: false, isVerificationOpen: false, isLoginOpen: true });
      return true;
    } catch (error: any) {
      console.error('Error verifying account:', error);
      set({ error: error.message || 'Failed to verify account', isLoading: false });
      return false;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await resetPassword({ username: email });
      set({ isLoading: false, isPasswordReset: true, verificationEmail: email });
      return true;
    } catch (error: any) {
      console.error('Error requesting password reset:', error);
      set({ error: error.message || 'Failed to request password reset', isLoading: false });
      return false;
    }
  },

  confirmForgotPassword: async (email, code, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await confirmResetPassword({ username: email, confirmationCode: code, newPassword });
      set({ isLoading: false, isResetPasswordOpen: false, isLoginOpen: true, isPasswordReset: false });
      return true;
    } catch (error: any) {
      console.error('Error confirming password reset:', error);
      set({ error: error.message || 'Failed to reset password', isLoading: false });
      return false;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await signOut();
      set({ user: null, isAuthenticated: false, isLoading: false, hasCheckedAuth: false });
    } catch (error: any) {
      console.error('Error signing out:', error);
      set({ error: error.message || 'Failed to sign out', isLoading: false });
    }
  },

  checkAuthState: async () => {
    const state = get();
    
    // Prevent multiple simultaneous auth checks
    if (state.isLoading || state.hasCheckedAuth) {
      return;
    }

    set({ isLoading: true });
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      set({
        user: {
          email: attributes?.email ?? '',
          sub: currentUser.userId,
          attributes
        },
        isAuthenticated: true,
        isLoading: false,
        hasCheckedAuth: true
      });
    } catch (error: any) {
      console.log('Auth check result: User not authenticated');
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        hasCheckedAuth: true 
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
          error: null
        });
      } else {
        throw new Error(result.error || 'OAuth callback failed');
      }
    } catch (error: any) {
      console.error('OAuth callback error:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
        error: error.message || 'Authentication failed'
      });
      throw error;
    }
  }
}));
