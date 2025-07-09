import { create } from "zustand";
import type { Receipt } from "@/app/store/project/receipt-store";
import { useReceiptStore } from "@/app/store/project/receipt-store";

interface Item {
  item_name: string;
  quantity: number;
  unit_price: number;
}

type EntryMode = "manual" | "generated";

interface PurchaseState {
  vendor_name: string;
  transaction_date: string;
  items: Item[];
  entryMode: EntryMode;
  isManualEntry: boolean;
  setVendorName: (name: string) => void;
  setDate: (transaction_date: string) => void;
  addItem: (item: Item) => void;
  clear: () => void;
  updateItemQuantity: (index: number, quantity: number) => void;
  editItem: (index: number, item: Item) => void;
  setEditingIndex: (index: number | null) => void;
  editingIndex: number | null;
  removeItem: (index: number) => void;
  initializeFromReceipt: (receipt: Receipt) => void;
  setManualEntry: (isManual: boolean) => void;
  setEntryMode: (mode: EntryMode) => void;
  resetToManual: () => void;
  initializeManualEntry: () => void;
  initializeGenerated: () => void;
  createNewReceipt: (
    projectId: string,
    imageUrl?: string,
  ) => Promise<Receipt | null>;
  calculateTotalAmount: () => number;
}

export const usePurchaseStore = create<PurchaseState>((set, get) => ({
  vendor_name: "",
  transaction_date: "",
  items: [],
  entryMode: "manual",
  isManualEntry: true,
  setVendorName: (name) => set({ vendor_name: name }),
  setDate: (transaction_date) => set({ transaction_date }),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      entryMode: "manual",
      isManualEntry: true,
    })),
  clear: () =>
    set({
      items: [],
      entryMode: "manual",
      isManualEntry: true,
      vendor_name: "",
      transaction_date: "",
      editingIndex: null,
    }),
  updateItemQuantity: (index: number, quantity: number) =>
    set((state) => {
      const updatedItems = [...state.items];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Math.max(1, quantity),
      };
      return { items: updatedItems };
    }),
  editItem: (index: number, updatedItem: Item) =>
    set((state) => {
      const updatedItems = [...state.items];
      updatedItems[index] = { ...updatedItems[index], ...updatedItem };
      return { items: updatedItems };
    }),
  setEditingIndex: (index: number | null) => set({ editingIndex: index }),
  editingIndex: null,
  removeItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
    })),
  initializeFromReceipt: (receipt: Receipt) =>
    set({
      vendor_name: receipt.vendor_name || "",
      transaction_date: receipt.transaction_date || "",
      items:
        receipt.items?.map((item) => ({
          item_name: item.item_name || "",
          quantity: item.quantity || 1,
          unit_price: item.unit_price || 0,
        })) || [],
      entryMode: "generated",
      isManualEntry: false,
    }),
  setManualEntry: (isManual: boolean) =>
    set({
      isManualEntry: isManual,
      entryMode: isManual ? "manual" : "generated",
    }),
  setEntryMode: (mode: EntryMode) =>
    set({
      entryMode: mode,
      isManualEntry: mode === "manual",
    }),
  resetToManual: () =>
    set({
      entryMode: "manual",
      isManualEntry: true,
      items: [],
      vendor_name: "",
      transaction_date: "",
      editingIndex: null,
    }),
  initializeManualEntry: () =>
    set({
      vendor_name: "",
      transaction_date: "",
      items: [],
      entryMode: "manual",
      isManualEntry: true,
      editingIndex: null,
    }),
  initializeGenerated: () =>
    set({
      vendor_name: "",
      transaction_date: "",
      items: [],
      entryMode: "generated",
      isManualEntry: false,
      editingIndex: null,
    }),
  calculateTotalAmount: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0,
    );
  },
  createNewReceipt: async (projectId: string, imageUrl?: string) => {
    const { vendor_name, transaction_date, items, calculateTotalAmount } =
      get();

    const receiptData = {
      project_id: projectId,
      vendor_name: vendor_name || "Unknown Vendor",
      transaction_date:
        transaction_date || new Date().toISOString().split("T")[0],
      total_amount: calculateTotalAmount(),
      image_url: imageUrl || "",
      items,
    };

    try {
      const receiptStore = useReceiptStore.getState();
      const newReceipt = await receiptStore.createReceipt(receiptData);

      if (newReceipt) {
        set({
          vendor_name: "",
          transaction_date: "",
          items: [],
          entryMode: "manual",
          isManualEntry: true,
          editingIndex: null,
        });
      }

      return newReceipt;
    } catch {
      return null;
    }
  },
}));
