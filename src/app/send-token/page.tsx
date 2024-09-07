"use client";
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

function SendToken() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("SOL");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendToken() {
    if (wallet.connected && wallet.publicKey) {
      try {
        // let to = document.getElementById("recipient").value;
        // let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
          })
        );
        await wallet.sendTransaction(transaction, connection);
        alert("Transaction Successfully Sent" + amount + "SOL to" + recipient);
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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-slate-900 rounded-2xl shadow-md mt-20 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Send SOL</h1>
          {/* <div className="mb-4 text-right">
            <span className="text-sm font-medium text-slate-400">
              Balance:{" "}
            </span>
            <span className="text-lg font-bold text-white">
              {balance.toFixed(9)} SOL
            </span>
          </div> */}
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="">
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-slate-300 p-6"
              >
                Recipient Address
              </label>
              <input
                type="text"
                id="recipient"
                className="w-80 px-4 py-3 mx-6 rounded-xl bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
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
                className="w-80 px-4 py-3 mx-6 rounded-xl bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
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
                className={`w-80 mx-6 bg-blue-500 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                // disabled={isLoading || parseFloat(amount) > balance}
              >
                {isLoading ? "Sending..." : "Send SOL"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-slate-900">
              Transaction Confirmed
            </h2>
            <p className="mb-4 text-slate-700">
              You have successfully sent {amount} SOL to {recipient}.
            </p>
            <button
              onClick={resetForm}
              className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendToken;
