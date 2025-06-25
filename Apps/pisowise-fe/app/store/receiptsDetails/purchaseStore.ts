import { create } from "zustand";

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
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  storeName: "",
  date: "",
  items: [],
  setStoreName: (name) => set({ storeName: name }),
  setDate: (date) => set({ date }),
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
clear: () => set({ storeName: "", date: "", items: [] }),
}));