"use client";

import { create } from "zustand";
import { useAuthStore } from "../session-store";
import axios from "axios";

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
  // Actions
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
