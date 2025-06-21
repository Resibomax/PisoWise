import { create } from "zustand";

interface AuthStore {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openSignup: () => void;
  closeSignup: () => void;
  switchToSignup: () => void;
  switchToLogin: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
  closeLogin: () => set({ isLoginOpen: false }),
  openSignup: () => set({ isSignupOpen: true, isLoginOpen: false }),
  closeSignup: () => set({ isSignupOpen: false }),
  switchToSignup: () => set({ isSignupOpen: true, isLoginOpen: false }),
  switchToLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
}));