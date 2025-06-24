import React from "react";
import { CircleUser } from "lucide-react";
import logo from "@/public/assets/pisowise.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center py-4 px-4 z-50">
      <div className="bg-[#1B1212]/45 backdrop-blur-md rounded-full px-4 shadow-lg w-full min-w-[288px] min-h-[34px] md:w-[90%] xl:w-[70%]">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link
            className="text-white text-lg font-medium cursor-pointer flex gap-2"
            href="/"
          >
            <Image src={logo} alt="Pisowise Logo" width={40} height={40} />
          </Link>

          {/* User Icon */}
          <button className="text-white  transition-colors rounded-full hover:bg-white/10 p-1 cursor-pointer">
            <CircleUser className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
