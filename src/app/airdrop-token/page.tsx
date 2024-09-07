"use client";

import { useEffect, useState } from "react";
import { useWalletConnection } from "@/hooks/useWalletConnects";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

function RequestAirdrop() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const { wallet, connection } = useWalletConnection();

  useEffect(() => {
    if (wallet.publicKey) {
      getBalance();
    }
  }, [wallet.publicKey]);

  async function requestAirdrop() {
    if (wallet.connected && wallet.publicKey) {
      try {
        await connection.requestAirdrop(
          wallet.publicKey,
          amount * LAMPORTS_PER_SOL
        );
      } catch (error) {
        console.log("Nhi hoa", error);
      }
      console.log(
        "Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58()
      );
      alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    } else {
      alert("Please connect your wallet first");
    }
  }

  async function getBalance() {
    if (wallet.publicKey) {
      try {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch balance", error);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white to-blue-500 ">
      <div className=" flex mb-20 gap-10">
        <WalletModalProvider>
          <WalletMultiButton />
          {wallet.connected && <WalletDisconnectButton />}
        </WalletModalProvider>
      </div>
      <div className="w-full max-w-md bg-slate-900 backdrop-blur-lg rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          Airdrop Tokens
        </h2>
        <div className="p-6 rounded-2xl">
          <h3 className="text-xl font-medium text-white mb-2">
            Wallet Balance
          </h3>
          <p className="text-2xl font-bold text-white">{balance}</p>
        </div>
        <form onSubmit={requestAirdrop} className="space-y-6 rounded-2xl">
          <div>
            <label
              htmlFor="amount"
              className="block text-xl font-medium text-white p-6 "
            >
              Airdrop Amount
            </label>
            <input
              id="amount"
              type="text"
              placeholder="Enter amount to airdrop"
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="w-80 px-4 py-3 mx-6 rounded-xl bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-80 mx-6 bg-blue-500 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Airdrop Tokens"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestAirdrop;
