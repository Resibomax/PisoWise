import { create } from "zustand";
import type { Receipt } from "@/app/store/project/receipt-store";

interface Item {
  item_name: string;
  quantity: number;
  unit_price: number;
}

interface PurchaseState {
  vendor_name: string;
  transaction_date: string;
  items: Item[];
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
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  vendor_name: "",
  transaction_date: "",
  items: [],
  setVendorName: (name) => set({ vendor_name: name }),
  setDate: (transaction_date) => set({ transaction_date }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clear: () => set({ items: [] }),
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
    }),
}));
