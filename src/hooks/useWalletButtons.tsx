// WalletButtons.tsx
import React, { useEffect, useState } from "react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { useWalletConnection } from "@/hooks/useWalletConnects";

export const WalletButtons = () => {
  const { wallet } = useWalletConnection();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark the component as mounted to prevent SSR mismatch
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering during SSR and initial hydration
    return null;
  }

  return (
    <div className="flex sm:flex-row flex-col gap-12">
      <WalletMultiButton />
      {wallet?.connected && <WalletDisconnectButton />}
    </div>
  );
};
