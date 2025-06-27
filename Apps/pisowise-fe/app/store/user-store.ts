import { create } from "zustand";
import { useAuthStore } from "./auth-store";
import axios from "axios";

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

      const response = await axios.get(url, { headers });

      const userData = response.data;

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

      let errorMessage = "Failed to fetch user";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = "User not found in database. Please contact support.";
        } else {
          errorMessage = error.response?.data?.message || error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  clearUser: () => {
    set({ dbUser: null, error: null, isLoading: false });
  },
}));
