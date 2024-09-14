"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  // ProductItem,
} from "@/components/ui/Navbar/navbar";
import { cn } from "@/lib/utils";

export function NavbarMenu() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto mt-4 z-50 w-fit border rounded-full",
        className
      )}
    >
      {/* <Menu setActive={setActive}>
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
      </Menu> */}
      <div className="flex text-white sm:text-lg text-sm sm:py-6 py-3 sm:px-6 px-3 sm:gap-6 gap-3">
        <a href="/airdrop-token" className="cursor-pointer">
          Airdrop Token
        </a>
        <a href="/send-token" className="cursor-pointer">
          Send Token
        </a>
        <a href="/sign-message" className="cursor-pointer">
          Sign Message
        </a>
        <a href="/token-launchpad" className="cursor-pointer">
          Mint Token
        </a>
      </div>
    </div>
  );
}
