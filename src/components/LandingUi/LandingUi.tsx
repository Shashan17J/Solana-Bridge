"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background/aurora-background";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletButtons } from "@/hooks/useWalletButtons";

export function LandingUi() {
  return (
    <WalletModalProvider>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 w-full"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-white text-center">
            Experience the Future of Digital Assets on Solana
          </div>
          <div className="font-extralight text-base md:text-4xl text-white dark:text-neutral-200 py-4">
            Add your wallet to continue.
          </div>
          <WalletButtons />
        </motion.div>
      </AuroraBackground>
    </WalletModalProvider>
  );
}
