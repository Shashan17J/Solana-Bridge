"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519";
import { useWalletConnection } from "@/hooks/useWalletConnects";

// Verify the Ownership of wallet
export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { wallet } = useWalletConnection();

  async function signingMessage() {
    setError("");
    setSignature("");

    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");
      // covert string to bytes
      const encodedMessage = new TextEncoder().encode(message);

      // sends to web2 server (ex tensor[NFT])
      const signature = await signMessage(encodedMessage);

      // it validate that (that this signature done by the "prviate key" who is corresponding to this "public key" )
      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        console.log("Message signature invalid!");
      }

      setSignature(bs58.encode(signature));
    } catch (err: any) {
      setError(err.message);
    }
  }

  const handleSigningMessage = () => {
    setIsLoading(true);
    signingMessage();
    setIsLoading(false);
  };

  return (
    <>
      {wallet.connected && wallet.publicKey ? (
        <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-transparent border rounded-2xl shadow-md mt-28 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-white mb-6">
                Sign Message
              </h1>
              <form onSubmit={handleSigningMessage}>
                <label
                  htmlFor="message"
                  className=" text-md text-slate-300 font-medium"
                >
                  Message to Sign
                </label>
                <textarea
                  id="message"
                  className="mt-4 block w-full border rounded-md shadow-sm py-2 px-3 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 sm:text-sm"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message here"
                />
              </form>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading || !message}
                  className="w-80 mx-10 bg-transparent border text-white rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSigningMessage}
                >
                  {isLoading ? "Processing..." : "Sign"}
                </button>
              </div>
              {error && (
                <div className="mt-4 p-2 bg-transparent text-red-500 rounded">
                  {error}
                </div>
              )}
              {signature && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    Signature:
                  </h2>
                  <div className="p-2 bg-transparent border rounded break-all text-slate-300 text-sm">
                    {signature}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl text-white font-serif">
          Please Connect Your Wallet First !
        </div>
      )}
    </>
  );
}
