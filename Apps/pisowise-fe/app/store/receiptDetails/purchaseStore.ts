import { create } from "zustand";
import type { Receipt } from "@/app/store/project/receipt-store";

interface Item {
  itemName: string;
  quantity: number;
  price: number;
}

interface PurchaseState {
  storeName: string;
  date: string;
  items: Item[];
  setStoreName: (name: string) => void;
  setDate: (date: string) => void;
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
  storeName: "",
  date: "",
  items: [],
  setStoreName: (name) => set({ storeName: name }),
  setDate: (date) => set({ date }),
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
      storeName: receipt.vendor_name || "",
      date: receipt.transaction_date || "",
      items:
        receipt.items?.map((item) => ({
          itemName: item.item_name || "",
          quantity: item.quantity || 1,
          price: item.unit_price || 0,
        })) || [],
    }),
}));
