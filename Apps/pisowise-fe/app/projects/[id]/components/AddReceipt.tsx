"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { Undo2, Image as ImageIcon } from "lucide-react";
import { useRef } from "react";

export default function AddReceipt() {
  const { closeAddReceiptPage } = useModalStore();
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
    <div className="flex justify-center w-full">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="self-start">
          <Button
            className="bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white flex items-center gap-2"
            onClick={closeAddReceiptPage}
          >
            <Undo2 className="h-5 w-5" />
            <span className="font-roboto-regular text-base sm:text-lg">
              Back
            </span>
          </Button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={handleInputBoxClick}
          className="flex flex-col items-center justify-center bg-[#1B1212] h-[294px] w-full rounded-[12px] cursor-pointer border-2 border-[#349868]"
        >
          <ImageIcon className="text-[#FBF5F3] w-[100px] h-[100px]" />
          <p className="text-[#FBF5F3] font-roboto-regular text-base sm:text-lg mt-4 text-center">
            Upload a picture of the receipt
          </p>
        </div>

        <div className="text-[#FBF5F3] font-roboto-regular text-center">
          <p>
            Supported formats: JPG, PNG, PDF <br /> Max size: 4MB
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button className="text-base sm:text-lg font-nor text-[#FBF5F3] bg-[#349868] w-full rounded-[12px]">
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
