"use client";

import { create } from "zustand";
import { useAuthStore } from "../session-store";
import axios from "axios";
import { toast } from "sonner";

export interface Receipt {
  receipt_id: string;
  project_id: string;
  vendor_name: string;
  transaction_date: string;
  total_amount: number;
  image_url: string;
  items?: Array<{
    item_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

interface CreateReceiptData {
  project_id: string;
  vendor_name: string;
  transaction_date: string;
  total_amount: number;
  image_url?: string;
  items: Array<{
    item_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

interface ItemCreate {
  receipt_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
}

interface ReceiptState {
  receipt: Receipt | null;
  receipts: Receipt[] | null;
  isLoading: boolean;
  error: string | null;
  getReceiptById: (receiptId: string) => Promise<void>;
  updateReceipt: (
    receiptId: string,
    updates: Partial<Receipt>,
  ) => Promise<void>;
  deleteReceipt: (receiptId: string) => Promise<void>;
  getReceiptsByProjectId: (projectId: string) => Promise<Receipt[] | null>;
  createReceipt: (receiptData: CreateReceiptData) => Promise<Receipt | null>;
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
      const response = await axios.get(url, { headers });

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
      toast.error("Failed to load receipt", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
  },

  createReceipt: async (receiptData: CreateReceiptData) => {
    try {
      set({ isLoading: true, error: null });
      const headers = await useAuthStore.getState().getAuthHeaders();
      const { items, ...receiptOnlyData } = receiptData;

      const receiptUrl = `${API_URL}/receipts`;
      const receiptResponse = await axios.post(receiptUrl, receiptOnlyData, {
        headers,
      });
      const newReceipt = receiptResponse.data;

      if (items && items.length > 0) {
        const itemPromises = items.map(async (item) => {
          const itemData: ItemCreate = {
            receipt_id: newReceipt.receipt_id,
            item_name: item.item_name,
            quantity: item.quantity,
            unit_price: item.unit_price,
          };
          try {
            await axios.post(`${API_URL}/items`, itemData, { headers });
            return { success: true };
          } catch {
            return { success: false };
          }
        });
        await Promise.allSettled(itemPromises);
      }

      set((state) => ({
        receipt: newReceipt,
        receipts: state.receipts
          ? [...state.receipts, newReceipt]
          : [newReceipt],
        isLoading: false,
      }));

      toast.success("Receipt created successfully", {
        description: `Receipt from "${receiptData.vendor_name}" has been added to your project.`,
        style: { backgroundColor: "#349868", color: "white" },
      });
      return newReceipt;
    } catch (error) {
      let errorMessage = "Failed to create receipt";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
      toast.error("Failed to create receipt", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
      return null;
    }
  },

  updateReceipt: async (receiptId: string, updates: Partial<Receipt>) => {
    try {
      set({ isLoading: true, error: null });
      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/receipts/${receiptId}`;
      const response = await axios.put(url, updates, { headers });

      set({ receipt: response.data, isLoading: false });
      toast.success("Receipt updated successfully", {
        description: "Your receipt changes have been saved.",
        style: { backgroundColor: "#349868", color: "white" },
      });
    } catch (error) {
      let errorMessage = "Failed to update receipt";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
      toast.error("Failed to update receipt", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
  },

  deleteReceipt: async (receiptId: string) => {
    try {
      set({ isLoading: true, error: null });
      const headers = {
        ...(await useAuthStore.getState().getAuthHeaders()),
        accept: "application/json",
      };
      const url = `${API_URL}/receipts/${receiptId}`;
      await axios.delete(url, { headers });

      set((state) => ({
        receipts:
          state.receipts?.filter((r) => r.receipt_id !== receiptId) || [],
        isLoading: false,
      }));

      toast.success("Receipt deleted successfully", {
        description:
          "The receipt has been permanently removed from your project.",
        style: { backgroundColor: "#349868", color: "white" },
      });
    } catch (error) {
      let errorMessage = "Failed to delete receipt";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, isLoading: false });
      toast.error("Failed to delete receipt", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
    }
  },

  getReceiptsByProjectId: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null });
      const headers = await useAuthStore.getState().getAuthHeaders();
      const url = `${API_URL}/receipts?project_id=${projectId}`;
      const response = await axios.get(url, { headers });
      const receiptsData = Array.isArray(response.data) ? response.data : [];

      set({ receipts: receiptsData, isLoading: false });
      return receiptsData;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        set({ receipts: [], isLoading: false, error: null });
        return [];
      }

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
      toast.error("Failed to load receipts", {
        description: errorMessage,
        style: { backgroundColor: "#E73648", color: "white" },
      });
      return null;
    }
  },
}));
