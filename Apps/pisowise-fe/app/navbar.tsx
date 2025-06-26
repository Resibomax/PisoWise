"use client";
import React from "react";
import { CircleUser, LogOutIcon } from "lucide-react";
import logo from "@/public/assets/pisowise_navbar.svg";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "./store/authStore";

export default function Navbar() {
  const { signOut, user } = useAuthStore();
  return (
    <div className="flex justify-center z-50 sticky top-0">
      <div className="flex bg-[#1B1212]/45 backdrop-blur-md shadow-lg w-full min-h-[52px] px-4">
        <div className="flex items-center justify-between py-2 lg:px-[2rem] mx-auto w-full">
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
                {!user?.attributes?.profile && (
                  <CircleUser className="text-white" size={24} />
                )}
                {user?.attributes?.profile && (
                  <Image
                    src={user?.attributes?.profile}
                    alt="Profile Picture"
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="border-none shadow-lg bg-opacity-90"
              align="end"
            >
              <DropdownMenuItem
                className="cursor-pointer text-white flex justify-center py-2 px-4 rounded-md transition-all duration-500 hover:brightness-120 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(355deg, rgba(105, 105, 105, 1) 0%, rgba(207, 207, 207, 0.55) 50%, rgba(235, 232, 232, 1) 100%)",
                }}
              >
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 justify-center"
                >
                  <LogOutIcon className="text-white" size={16} />
                  <p>Log out</p>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
