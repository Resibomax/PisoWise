"use client";

import { create } from "zustand";
import { useReceiptStore } from "../projectDetails/receiptsStore";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptEditState {
  editItems: Record<string, Item[]>;
  setEditItems: (receiptId: string, items: Item[]) => void;
  handleQuantityChange: (
    receiptId: string,
    itemId: string,
    change: number,
  ) => void;
  handleDeleteItem: (receiptId: string, itemId: string) => void;
  handleAddItem: (receiptId: string) => void;
  handleReset: (receiptId: string, originalItems: Item[]) => void;
  saveChanges: (receiptId: string) => void;
  getEditItems: (receiptId: string) => Item[];
  getEditTotals: (receiptId: string) => {
    totalItems: number;
    totalAmount: number;
  };
  clearEditItems: (receiptId: string) => void;
}

export const useReceiptEditStore = create<ReceiptEditState>((set, get) => ({
  editItems: {},

  setEditItems: (receiptId: string, items: Item[]) => {
    set((state) => ({
      editItems: {
        ...state.editItems,
        [receiptId]: [...items],
      },
    }));
  },

  handleQuantityChange: (receiptId: string, itemId: string, change: number) => {
    set((state) => {
      const currentItems = state.editItems[receiptId] || [];
      const updatedItems = currentItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      );
      return {
        editItems: {
          ...state.editItems,
          [receiptId]: updatedItems,
        },
      };
    });
  },

  handleDeleteItem: (receiptId: string, itemId: string) =>
    set((state) => ({
      editItems: {
        ...state.editItems,
        [receiptId]: (state.editItems[receiptId] || []).filter(
          (item) => item.id !== itemId,
        ),
      },
    })),

  handleAddItem: (receiptId: string) =>
    set((state) => {
      const newItem: Item = {
        id: Date.now().toString(),
        name: "New Item",
        quantity: 1,
        price: 0,
      };
      return {
        editItems: {
          ...state.editItems,
          [receiptId]: [...(state.editItems[receiptId] || []), newItem],
        },
      };
    }),

  handleReset: (receiptId: string, originalItems: Item[]) => {
    set((state) => ({
      editItems: {
        ...state.editItems,
        [receiptId]: [...originalItems],
      },
    }));
  },

  saveChanges: (receiptId: string) => {
    const state = get();
    const editedItems = state.editItems[receiptId];

    if (editedItems) {
      const totalItems = editedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const totalAmount = editedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const receiptStore = useReceiptStore.getState();
      receiptStore.updateReceipt(receiptId, {
        items: editedItems,
        totalItems,
        totalAmount,
      });

      set((state) => {
        const newEditItems = { ...state.editItems };
        delete newEditItems[receiptId];
        return { editItems: newEditItems };
      });
    }
  },

  getEditItems: (receiptId: string) => {
    const state = get();
    return state.editItems[receiptId] || [];
  },

  getEditTotals: (receiptId: string) => {
    const state = get();
    const editedItems = state.editItems[receiptId] || [];

    const totalItems = editedItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalAmount = editedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return { totalItems, totalAmount };
  },

  clearEditItems: (receiptId: string) =>
    set((state) => {
      const newEditItems = { ...state.editItems };
      delete newEditItems[receiptId];
      return { editItems: newEditItems };
    }),
}));
