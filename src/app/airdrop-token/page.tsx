"use client";

import { useEffect, useState } from "react";
import { useWalletConnection } from "@/hooks/useWalletConnects";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ConnectWalletMessage } from "@/components/ErrorWalletConnectMessage/Message";

function RequestAirdrop() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
        setShowConfirmation(true);
      } catch (error) {
        console.log("Error", error);
      }
      // console.log(
      //   "Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58()
      // );
      // alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending token
    await requestAirdrop();
    setIsLoading(false);
    setShowConfirmation(true);
  };

  const resetForm = () => {
    setAmount(0);
    setShowConfirmation(false);
  };

  return (
    <div>
      {wallet.connected && wallet.publicKey ? (
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <div className="w-full max-w-md bg-transparent border backdrop-blur-lg rounded-3xl shadow-xl p-8">
            <h2 className="text-4xl font-bold mb-6 text-white text-center">
              Airdrop Tokens
            </h2>
            <div className="p-6 rounded-2xl">
              <h3 className="text-xl font-medium text-white mb-2">
                Wallet Balance
              </h3>
              <p className="text-2xl font-bold text-white">{balance}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl">
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
                  className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !amount}
                className="w-80 mx-6 bg-transparent border hover:ring-blue-900 text-white rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Airdrop Tokens"}
              </button>
            </form>
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center">
              <div className="bg-transparent border p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Airdrop Successful
                </h2>
                <p className="mb-4 text-white">
                  You have successfully airdrop {amount} of sol.
                </p>
                <button
                  onClick={resetForm}
                  className="w-full bg-transparent border text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ConnectWalletMessage />
      )}
    </div>
  );
}

export default RequestAirdrop;
