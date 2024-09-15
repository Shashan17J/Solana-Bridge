"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  // ProductItem,
} from "@/components/ui/Navbar/navbar";
import { cn } from "@/lib/utils";
import Logo from "../../../public/icons/solana.webp";
import Image from "next/image";
import { useWalletConnection } from "@/hooks/useWalletConnects";
import { useRouter } from "next/navigation";
import { ConnectWalletMessage } from "../ErrorWalletConnectMessage/Message";

export function NavbarMenu() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { wallet } = useWalletConnection();
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 flex items-center justify-between mt-4 z-50 w-screen",
        className
      )}
    >
      {/* Left aligned logo */}
      <div className="flex items-center cursor-pointer ml-5">
        <Image
          src={Logo}
          alt="Logo"
          className="h-14 w-14"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="flex text-white sm:text-lg text-sm py-3 sm:px-6 px-3 sm:gap-6 gap-3 mr-5">
        <a
          href="/airdrop-token"
          className="cursor-pointer sm:hover:text-xl hover:text-base transition-all duration-300 hover:text-blue-300"
        >
          Airdrop Token
        </a>
        <a
          href="/send-token"
          className="cursor-pointer sm:hover:text-xl hover:text-base transition-all duration-300 hover:text-blue-300"
        >
          Send Token
        </a>
        <a
          href="/sign-message"
          className="cursor-pointer sm:hover:text-xl hover:text-base transition-all duration-300 hover:text-blue-300"
        >
          Sign Message
        </a>
        <a
          href="/token-launchpad"
          className="cursor-pointer sm:hover:text-xl hover:text-base transition-all duration-300 hover:text-blue-300"
        >
          Mint Token
        </a>
      </div>
    </div>
  );
}

{
  /* <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/airdrop-token">Airdrop Token</HoveredLink>
            <HoveredLink href="/send-token">Send Token</HoveredLink>
            <HoveredLink href="/sign-message">Sign Message</HoveredLink>
            <HoveredLink href="/token-launchpad">Mint Token</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href=""
              src=""
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src=""
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src=""
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src=""
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu> */
}
