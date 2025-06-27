import { create } from "zustand";
import {
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth";

interface AuthUser {
  email: string;
  username: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeAuth: () => Promise<void>;
  getAuthToken: () => Promise<string | null>;
  getAuthHeaders: () => Promise<Record<string, string>>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initializeAuth: async () => {
    try {
      set({ isLoading: true, error: null });

      const user = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();

      const authUser: AuthUser = {
        email: userAttributes.email || "",
        username: user.username,
      };

      set({
        user: authUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Auth initialization failed:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    }
  },

  getAuthToken: async () => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString() || null;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  },

  getAuthHeaders: async () => {
    const token = await get().getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  signOut: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },
}));
