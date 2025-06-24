"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Undo2, Image as ImageIcon } from "lucide-react";
import { useRef } from "react";

export default function AddProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="flex justify-center w-full px-4 mt-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Back Button aligned with Upload box */}
        <div className="self-start">
          <Button
            className="bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white flex items-center gap-2"
            onClick={() => router.back()}
          >
            <Undo2 className="h-5 w-5" />
            <span className="font-roboto-regular text-base sm:text-lg">Back</span>
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Box */}
        <div
          onClick={handleInputBoxClick}
          className="flex flex-col items-center justify-center bg-[#1B1212] h-[294px] w-full rounded-[12px] cursor-pointer hover:bg-[#2a1f1f] transition"
        >
          <ImageIcon className="text-[#FBF5F3] w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px]" />
          <p className="text-[#FBF5F3] font-roboto text-base sm:text-lg mt-4 text-center">
            Upload a picture of the receipt
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Button className="text-base sm:text-lg font-light text-[#FBF5F3] bg-[#349868] w-full rounded-[12px]">
            Upload
          </Button>
          <Button className="text-base sm:text-lg font-light border bg-transparent text-[#FBF5F3] w-full rounded-[12px]">
            Manual Input
          </Button>
        </div>
      </div>
    </div>
  );
}
