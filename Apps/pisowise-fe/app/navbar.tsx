"use client";
import React from "react";
import { CircleUser, LogOutIcon } from "lucide-react";
import logo from "@/public/assets/pisowise.svg";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center z-50 sticky top-0">
      <div className="bg-[#1B1212]/45 backdrop-blur-md shadow-lg w-full min-h-[48px] px-4">
        <div className="flex items-center justify-between py-2 lg:px-[3rem] 2xl:w-[73%] xl:py-4 mx-auto">
          {/* Logo */}
          <Link
            className="text-white text-lg font-medium cursor-pointer flex gap-2"
            href="/"
          >
            <Image src={logo} alt="Pisowise Logo" width={24} height={24} />
          </Link>

          {/* User Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <CircleUser className="text-white" size={24} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-none shadow-lg bg-opacity-90"
              align="end"
            >
              <DropdownMenuItem className="cursor-pointer text-white flex justify-center py-2 logout-item">
                <div className="flex items-center gap-2 justify-center">
                  <LogOutIcon className="text-white" size={16} />
                  <p>Log out</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
