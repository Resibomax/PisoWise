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
      // Optionally: preview, upload, etc.
    }
  };

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="items-start">
        <Button
          className="text-left bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
          onClick={() => router.back()}
        >
          <Undo2 className="cursor-pointer h-5 w-5" />
          <p className="font-roboto-regular text-[16px]">Back</p>
        </Button>
      </div>

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
        className="flex flex-col items-center justify-center bg-[#1B1212] h-[294px] rounded-[12px] cursor-pointer hover:bg-[#2a1f1f] transition m-4"
      >
        <ImageIcon className="text-[#FBF5F3] w-[100px] h-[100px]" />
        <p className="text-[#FBF5F3] font-roboto text-[16px] mt-2">
          Upload a picture of the receipt
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <Button className="text-[16px] text-[Ember] bg-[#349868]">Upload</Button>
      </div>
    </div>
  );
}
