"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/app/store/modal-store";
import { Undo2, Image as ImageIcon, Loader, XCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function AddReceipt() {
  const { closeAddReceiptPage, openManualReceipt } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputBoxClick = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col mt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          className="flex gap-2 mb-4 items-center bg-transparent hover:bg-white hover:text-black rounded-[12px] text-white"
          onClick={() => {
            closeAddReceiptPage();
          }}
          disabled={isUploading}
        >
          <Undo2 className="h-5 w-5" />
          <span className="font-roboto-regular text-[16px]">Back</span>
        </Button>
      </div>

      {/* Content */}
      <div className="relative flex flex-col w-full items-center">
        {isUploading && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />
        )}
        <div
          className={`w-full max-w-sm md:max-w-md flex flex-col items-center gap-6 relative z-10 ${
            isUploading ? "pointer-events-none select-none" : ""
          }`}
        >
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
            className={`flex items-center justify-center bg-[#1B1212] h-[294px] w-full md:w-[640px] md:h-[455px] rounded-[12px] border-2 border-[#349868] transition ${
              isUploading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                width={640}
                height={455}
                className="max-h-full max-w-full object-contain rounded-[12px] p-2"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <ImageIcon className="text-[#FBF5F3] w-[100px] h-[100px]" />
                <p className="text-[#FBF5F3] font-roboto-regular text-base sm:text-lg mt-4">
                  Upload a picture of the receipt
                </p>
              </div>
            )}
          </div>
          <div className="text-[#FBF5F3] font-roboto-regular text-center">
            <p>
              Supported formats: JPG, PNG, PDF •<br className="md:hidden" /> Max
              size: 4MB
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center w-full">
            <Button
              className="text-base sm:text-lg font-normal text-[#FBF5F3] bg-[#349868] w-full rounded-[12px] hover:bg-[#49C187] disabled:opacity-50 md:w-[640px]"
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
              className="text-base sm:text-lg font-light border bg-transparent text-[#FBF5F3] w-full rounded-[12px] hover:bg-white hover:text-black md:w-[640px]"
              onClick={openManualReceipt}
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
    </div>
  );
}
