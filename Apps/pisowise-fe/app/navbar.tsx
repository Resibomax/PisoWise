import React from "react";
import { CircleUser } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex fixed items-center justify-center pt-6 z-50 w-full">
      <div className="bg-[#1B1212]/45 backdrop-blur-md rounded-full px-4 shadow-lg">
        <div className="flex items-center justify-between min-w-[288px] min-h-[34px]">
          {/* Logo */}
          <button className="text-white text-lg font-medium cursor-pointer">Logo</button>
          
          {/* User Icon */}
          <button className="text-white  transition-colors rounded-full hover:bg-white/10 p-1 cursor-pointer">
            <CircleUser className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
