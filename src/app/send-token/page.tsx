"use client";
import React, { useState } from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useWalletConnection } from "@/hooks/useWalletConnects";
import { ConnectWalletMessage } from "@/components/ErrorWalletConnectMessage/Message";

function SendToken() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("SOL");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { wallet, connection } = useWalletConnection();

  async function sendToken() {
    if (wallet.connected && wallet.publicKey) {
      try {
        const transaction = new Transaction();
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
          })
        );
        await wallet.sendTransaction(transaction, connection);
      } catch (error) {
        console.log("Could not sent", error);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending token
    await sendToken();
    setIsLoading(false);
    setShowConfirmation(true);
  };

  const resetForm = () => {
    setRecipient("");
    setAmount("");
    setToken("ETH");
    setShowConfirmation(false);
  };

  return (
    <div>
      {wallet.connected && wallet.publicKey ? (
        <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-transparent border rounded-2xl shadow-md mt-20 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Send SOL</h1>
              <form onSubmit={handleSubmit} className="mb-10">
                <div>
                  <label
                    htmlFor="recipient"
                    className="block text-sm font-medium text-slate-300 p-6"
                  >
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                    placeholder="Enter Solana address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-slate-300 p-6"
                  >
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0"
                    step="0.000000001"
                    // max={balance.toString()}
                    placeholder="0.000000000"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className={`w-80 mx-6 bg-transparent border text-white rounded-lg py-3 px-4 font-medium hover:ring-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      isLoading ||
                      !recipient ||
                      !amount ||
                      parseFloat(amount) <= 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      isLoading ||
                      !recipient ||
                      !amount ||
                      parseFloat(amount) <= 0
                    }
                  >
                    {isLoading ? "Sending..." : "Send SOL"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center">
              <div className="bg-transparent border p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Transaction Confirmed
                </h2>
                <p className="mb-4 text-white">
                  You have successfully sent {amount} SOL to {recipient}.
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
        <div>
          <ConnectWalletMessage />
        </div>
      )}
    </div>
  );
}

export default SendToken;
