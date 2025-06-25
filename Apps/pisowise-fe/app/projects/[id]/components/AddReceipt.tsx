"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/projectsPage/modalStore";
import { Undo2, Image as ImageIcon, Loader, XCircle } from "lucide-react";
import { useRef, useState } from "react";

export default function AddReceipt() {
  const { closeAddReceiptPage } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null); // ← Error state

  const handleInputBoxClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null); // Reset error on new file select
      console.log("Selected file:", file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      // Simulate upload
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          const fail = Math.random() < 0.3;
          if (fail) {
            reject(new Error("OCR failed"));
          } else {
            resolve("Success");
          }
        }, 2000),
      );

      console.log("File uploaded successfully:", selectedFile.name);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Can't Read Receipt");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative flex justify-center w-full">
      {isUploading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />
      )}

      <div
        className={`w-full max-w-sm flex flex-col gap-6 relative z-10 ${
          isUploading ? "pointer-events-none select-none" : ""
        }`}
      >
        <div className="self-start">
          <Button
            className="bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white flex items-center gap-2"
            onClick={closeAddReceiptPage}
            disabled={isUploading}
          >
            <Undo2 className="h-5 w-5" />
            <span className="font-roboto-regular text-base sm:text-lg">
              Back
            </span>
          </Button>
        </div>

        {error && (
          <div className="flex justify-center items-center bg-[#1B1212] border-2 border-[#E73648] rounded-[12px] p-4">
            <div className="flex flex-row items-center text-center gap-3">
              <XCircle className="text-red-400 w-6 h-6" />
              <span className="text-red-400 font-roboto-regular text-[16px]">
                Error! {error}
              </span>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        <div
          onClick={handleInputBoxClick}
          className={`flex flex-col items-center justify-center bg-[#1B1212] h-[294px] w-full rounded-[12px] border-2 border-[#349868] transition ${
            isUploading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ImageIcon className="text-[#FBF5F3] w-[100px] h-[100px]" />
          <p className="text-[#FBF5F3] font-roboto-regular text-base sm:text-lg mt-4 text-center">
            {selectedFile
              ? selectedFile.name
              : "Upload a picture of the receipt"}
          </p>
        </div>

        <div className="text-[#FBF5F3] font-roboto-regular text-center">
          <p>
            Supported formats: JPG, PNG, PDF <br /> Max size: 4MB
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button
            className="text-base sm:text-lg font-normal text-[#FBF5F3] bg-[#349868] w-full rounded-[12px] hover:bg-[#49C187] disabled:opacity-50"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
          <Button
            className="text-base sm:text-lg font-light border bg-transparent text-[#FBF5F3] w-full rounded-[12px] hover:bg-white hover:text-black"
            disabled={isUploading}
          >
            Manual Input
          </Button>
        </div>
      </div>

      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <Loader className="text-white w-[80px] h-[80px] animate-spin" />
        </div>
      )}
    </div>
  );
}
