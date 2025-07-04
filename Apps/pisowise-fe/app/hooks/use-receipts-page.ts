"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/session-store";
import { useUserStore } from "../store/user-store";
import { useReceiptStore } from "../store/project/receipt-store";

export const useReceiptDetailsPage = (receiptId: string) => {
  const auth = useAuthStore();
  const user = useUserStore();
  const receipts = useReceiptStore();

  const hasInitializedAuth = useRef(false);
  const hasFetchedUser = useRef(false);
  const hasFetchedReceipt = useRef(false);

  // Init auth (only once)
  useEffect(() => {
    if (!hasInitializedAuth.current) {
      auth.initializeAuth();
      hasInitializedAuth.current = true;
    }
  }, []);

  // Fetch DB user once per email
  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.email && !hasFetchedUser.current) {
      user.fetchDatabaseUser(auth.user.email);
      hasFetchedUser.current = true;
    } else if (!auth.isAuthenticated || !auth.user?.email) {
      user.clearUser();
      hasFetchedUser.current = false; // allow re-fetch when signing in again
    }
  }, [auth.isAuthenticated, auth.user?.email]);

  // Fetch receipt once per ID
  useEffect(() => {
    if (receiptId && !hasFetchedReceipt.current) {
      receipts.getReceiptById(receiptId);
      hasFetchedReceipt.current = true;
    }
  }, [receiptId]);

  const isLoading = auth.isLoading || user.isLoading || receipts.isLoading;

  const error = auth.error || user.error || receipts.error;

  const refetchReceipt = async () => {
    if (receiptId) {
      hasFetchedReceipt.current = true;
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
