"use client";

import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useWalletConnection } from "@/hooks/useWalletConnects";
import {
  MINT_SIZE,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
  createMint,
} from "@solana/spl-token";
import { useState } from "react";

function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [supply, setSupply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { wallet, connection } = useWalletConnection();

  // ---Create Token without MetaData---
  async function createToken(e: any) {
    e.preventDefault();
    if (wallet.publicKey && wallet.connected) {
      try {
        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMint2Instruction(
            mintKeypair.publicKey,
            9,
            wallet.publicKey,
            wallet.publicKey,
            TOKEN_PROGRAM_ID
          )
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;
        transaction.partialSign(mintKeypair);
        await wallet.sendTransaction(transaction, connection);
        console.log(
          `Token mint created at ${mintKeypair.publicKey.toBase58()}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      {wallet.connected && wallet.publicKey ? (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-transparent border rounded-2xl shadow-md mt-20 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-white mb-6">
                Solana Token Launchpad
              </h1>
              <form
                onSubmit={createToken}
                className="h-[27rem] overflow-y-auto pb-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300 p-6"
                  >
                    Token Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="symbol"
                    className="block text-sm font-medium text-slate-300 p-6"
                  >
                    Token Symbol
                  </label>
                  <input
                    type="text"
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                    placeholder="Symbol"
                  />
                </div>
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-slate-300 p-6"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                    placeholder="Image URL"
                  />
                </div>
                <div>
                  <label
                    htmlFor="initialSupply"
                    className="block text-sm font-medium text-slate-300 p-6"
                  >
                    Initial Supply
                  </label>
                  <input
                    type="text"
                    id="initialSupply"
                    value={supply}
                    onChange={(e) => setSupply(e.target.value)}
                    className="w-80 px-4 py-3 mx-6 rounded-xl bg-transparent border text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                    placeholder="Initial Supply"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    // disabled={!name || !symbol || !supply || !imgUrl}
                    className={`w-80 mx-6 bg-transparent border text-white rounded-lg py-3 px-4 font-medium hover:ring-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? "Loading" : "Create a Token"}
                  </button>
                </div>
              </form>
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
export default TokenLaunchpad;

// ----Create Token With MetaData----
// async function createToken() {
//   if (wallet.connected && wallet.publicKey) {
//     setIsLoading(true);
//     try {
//       const mintKeypair = Keypair.generate();
//       const metadata = {
//         mint: mintKeypair.publicKey,
//         name,
//         symbol,
//         // uri: "https://cdn.100xdevs.com/metadata.json",
//         uri: imgUrl,
//         additionalMetadata: [],
//       };

//       const mintLen = getMintLen([ExtensionType.MetadataPointer]);
//       const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

//       const lamports = await connection.getMinimumBalanceForRentExemption(
//         mintLen + metadataLen
//       );

//       const transaction = new Transaction().add(
//         SystemProgram.createAccount({
//           fromPubkey: wallet.publicKey,
//           newAccountPubkey: mintKeypair.publicKey,
//           space: mintLen,
//           lamports,
//           programId: TOKEN_2022_PROGRAM_ID,
//         }),
//         createInitializeMetadataPointerInstruction(
//           mintKeypair.publicKey,
//           wallet.publicKey,
//           mintKeypair.publicKey,
//           TOKEN_2022_PROGRAM_ID
//         ),
//         createInitializeMintInstruction(
//           mintKeypair.publicKey,
//           9,
//           wallet.publicKey,
//           null,
//           TOKEN_2022_PROGRAM_ID
//         ),
//         createInitializeInstruction({
//           programId: TOKEN_2022_PROGRAM_ID,
//           mint: mintKeypair.publicKey,
//           metadata: mintKeypair.publicKey,
//           name: metadata.name,
//           symbol: metadata.symbol,
//           uri: metadata.uri,
//           mintAuthority: wallet.publicKey,
//           updateAuthority: wallet.publicKey,
//         })
//       );

//       transaction.feePayer = wallet.publicKey;
//       transaction.recentBlockhash = (
//         await connection.getLatestBlockhash()
//       ).blockhash;
//       transaction.partialSign(mintKeypair);

//       await wallet.sendTransaction(transaction, connection);

//       console.log(
//         `Token mint created at ${mintKeypair.publicKey.toBase58()}`
//       );
//       const associatedToken = getAssociatedTokenAddressSync(
//         mintKeypair.publicKey,
//         wallet.publicKey,
//         false,
//         TOKEN_2022_PROGRAM_ID
//       );

//       console.log(associatedToken.toBase58());

//       const transaction2 = new Transaction().add(
//         createAssociatedTokenAccountInstruction(
//           wallet.publicKey,
//           associatedToken,
//           wallet.publicKey,
//           mintKeypair.publicKey,
//           TOKEN_2022_PROGRAM_ID
//         )
//       );

//       await wallet.sendTransaction(transaction2, connection);

//       const transaction3 = new Transaction().add(
//         createMintToInstruction(
//           mintKeypair.publicKey,
//           associatedToken,
//           wallet.publicKey,
//           Number(supply) * 10 ** 9,
//           [],
//           TOKEN_2022_PROGRAM_ID
//         )
//       );

//       await wallet.sendTransaction(transaction3, connection);
//     } catch (error) {
//       console.log("Error in Minting Token", error);
//     }
//     console.log("Minted!");
//   }
// }
