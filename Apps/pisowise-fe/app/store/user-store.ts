import { create } from "zustand";
import { useAuthStore } from "./auth-store";

interface DatabaseUser {
  user_id: string;
  email: string;
  username: string;
}

interface UserState {
  dbUser: DatabaseUser | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDatabaseUser: (email: string) => Promise<void>;
  clearUser: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useUserStore = create<UserState>((set) => ({
  dbUser: null,
  isLoading: false,
  error: null,

  fetchDatabaseUser: async (email: string) => {
    try {
      set({ isLoading: true, error: null });

      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/user?email=${encodeURIComponent(email)}`;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "User not found in database. Please contact support.",
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();

      if (!userData.user_id || !userData.email || !userData.username) {
        throw new Error("Invalid user data received from server");
      }

      const normalizedUser: DatabaseUser = {
        user_id: userData.user_id,
        email: userData.email,
        username: userData.username,
      };

      set({ dbUser: normalizedUser, isLoading: false });
    } catch (error) {
      console.error("Error fetching database user:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to fetch user",
        isLoading: false,
      });
    }
  },

  clearUser: () => {
    set({ dbUser: null, error: null, isLoading: false });
  },
}));
