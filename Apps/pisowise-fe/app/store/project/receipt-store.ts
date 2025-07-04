import { create } from "zustand";
import { useAuthStore } from "../session-store";
import axios from "axios";

interface Receipt {
  receipt_id: string;
  project_id: string;
  vendor_name: string;
  transaction_date: string;
  total_amount: number;
  items?: Array<{
    item_id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface ReceiptState {
  receipt: Receipt | null;
  receipts: Receipt[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  getReceiptById: (receiptId: string) => Promise<void>;
  updateReceipt: (
    receiptId: string,
    updates: Partial<Receipt>,
  ) => Promise<void>;
  deleteReceipt: (receiptId: string) => Promise<void>;
  getReceiptsByProjectId: (projectId: string) => Promise<Receipt[] | null>;
  deleteReceipts: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useReceiptStore = create<ReceiptState>((set) => ({
  receipt: null,
  receipts: null,
  isLoading: false,
  error: null,

  getReceiptById: async (receiptId: string) => {
    try {
      set({ isLoading: true, error: null });

      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/receipts/${receiptId}`;
      console.log("Calling API: ", url)

      const response = await axios.get(url, { headers });
      console.log(response.data)
      set({ receipt: response.data, isLoading: false });
    } catch (error) {
      let errorMessage = "Failed to fetch receipt";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
        receipt: null,
      });
    }
  },

  updateReceipt: async (receiptId: string, updates: Partial<Receipt>) => {
    try {
      set({ isLoading: true, error: null });

      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/receipts/${receiptId}`;

      const response = await axios.put(url, updates, { headers });
      console.log("Response: ", response)

      set({ receipt: response.data, isLoading: false });
    } catch (error) {
      let errorMessage = "Failed to update receipt";
      console.log("Error: ", errorMessage);

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  deleteReceipt: async (receiptId: string) => {
    try {
      set({ isLoading: true, error: null });

      const headers = {
        ...(await useAuthStore.getState().getAuthHeaders()), accept: "application/json",
      };
      const url = `${API_URL}/receipts/${receiptId}`;

      const response = await axios.delete(url, { headers });
      console.log("Response: ", response)

      set((state) => ({
        receipts: state.receipts?.filter((r) => r.receipt_id !== receiptId) || [],
        isLoading: false,
      }));
    } catch (error) {
      let errorMessage = "Failed to delete receipt";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, isLoading: false });
    }
  },

  deleteReceipts: () => {
    set({ receipts: null, error: null, isLoading: false });
  },

  getReceiptsByProjectId: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null });

      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/receipts?project_id=${projectId}`;

      const response = await axios.get(url, { headers });

      const receiptsData = Array.isArray(response.data) ? response.data : null;

      set({ receipts: receiptsData, isLoading: false });

      return receiptsData;
    } catch (error) {
      let errorMessage = "Failed to fetch receipts";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
        receipts: null,
      });

      return null;
    }
  },
}));
