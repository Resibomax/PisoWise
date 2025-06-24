import { create } from "zustand";
import { mockReceipts, type ReceiptDetails } from "@/app/projects/mockProject";

interface ReceiptStore {
  receipts: ReceiptDetails[];

  // Actions
  getReceiptsByProjectId: (projectId: string) => ReceiptDetails[];
  getReceiptById: (receiptId: string) => ReceiptDetails | undefined;
  addReceipt: (receipt: ReceiptDetails) => void;
  updateReceipt: (receiptId: string, updates: Partial<ReceiptDetails>) => void;
  deleteReceipt: (receiptId: string) => void;
}

export const useReceiptStore = create<ReceiptStore>((set, get) => ({
  receipts: mockReceipts,

  getReceiptsByProjectId: (projectId: string) => {
    return get().receipts.filter((receipt) => receipt.projectId === projectId);
  },

  getReceiptById: (receiptId: string) => {
    return get().receipts.find((receipt) => receipt.id === receiptId);
  },

  addReceipt: (receipt: ReceiptDetails) => {
    set((state) => ({
      receipts: [...state.receipts, receipt],
    }));
  },

  updateReceipt: (receiptId: string, updates: Partial<ReceiptDetails>) => {
    set((state) => ({
      receipts: state.receipts.map((receipt) =>
        receipt.id === receiptId ? { ...receipt, ...updates } : receipt,
      ),
    }));
  },

  deleteReceipt: (receiptId: string) => {
    set((state) => ({
      receipts: state.receipts.filter((receipt) => receipt.id !== receiptId),
    }));
  },
}));
