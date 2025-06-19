"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLandingStore } from "../app/store/loginStore";

export default function Landing() {
  const { view, setView, logoUrl } = useLandingStore();

  return (
    <div
      className="relative h-screen font-[Ember]"
      style={{
        backgroundImage: "url('/assets/bg-lines.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      {/* Logo placeholder */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 font-semibold text-[#FBF5F3] flex items-center justify-center">
            Logo
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center text-[40px] font-bold leading-[45px] tracking-[-0.4px] text-[#FBF5F3]">
          Snap
          <br />
          Receipts.
          <br />
          Track
          <br />
          Smarter.
        </div>
      </div>
    </div>
  );
}
