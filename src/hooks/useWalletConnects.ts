"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

// Custom hook to handle wallet and connection logic
export const useWalletConnection = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  return { wallet, connection };
};
