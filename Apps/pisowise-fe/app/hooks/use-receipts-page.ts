"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/session-store";
import { useUserStore } from "../store/user-store";
import { useReceiptStore } from "../store/project/receipt-store";

export const useReceiptDetailsPage = (receiptId: string) => {
  const auth = useAuthStore();
  const user = useUserStore();
  const receipts = useReceiptStore();

  // Init auth
  useEffect(() => {
    auth.initializeAuth();
  }, []);

  // Fetch DB user once authenticated
  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.email) {
      user.fetchDatabaseUser(auth.user.email);
    } else {
      user.clearUser();
      receipts.clearReceipt();
    }
  }, [auth.isAuthenticated, auth.user?.email]);

  // Fetch receipt when user is ready and receiptId exists
  useEffect(() => {
    if (receiptId) {
      receipts.getReceiptById(receiptId);
    }
  }, [receiptId]);

  const isLoading =
    auth.isLoading || user.isLoading || receipts.isLoading;

  const error = auth.error || user.error || receipts.error;

  const refetchReceipt = async () => {
    if (receiptId) {
      await receipts.getReceiptById(receiptId);
    }
  };

  return {
    // States
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    dbUser: user.dbUser,
    receipt: receipts.receipt,
    isLoading,
    error,

    // Actions
    refetchReceipt,
    updateReceipt: receipts.updateReceipt,
    signOut: auth.signOut,
  };
};
