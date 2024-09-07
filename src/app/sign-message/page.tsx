"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import * as ed25519 from "@noble/ed25519";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  async function handleSignMessage() {
    setError("");
    setSignature("");

    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      if (
        !(await ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      ) {
        throw new Error("Message signature invalid!");
      }

      setSignature(bs58.encode(signature));
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-slate-900 mt-28 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Sign Message</h1>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-300"
            >
              Message to Sign
            </label>
            <textarea
              id="message"
              className="mt-1 block w-full border border-slate-700 rounded-md shadow-sm py-2 px-3 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent sm:text-sm"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSignMessage}
              className="w-80 mx-6 bg-blue-500 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!publicKey || !signMessage}
            >
              Sign Message
            </button>
          </div>
          {error && (
            <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {signature && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-white mb-2">
                Signature:
              </h2>
              <div className="p-2 bg-slate-800 border border-slate-700 rounded break-all text-slate-300 text-sm">
                {signature}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
