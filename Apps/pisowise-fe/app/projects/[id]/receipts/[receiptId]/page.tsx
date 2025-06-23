"use client";

import { useParams } from "next/navigation";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";
import ItemsCard from "./components/ItemsCard";
import { ReceiptsHeader } from "./components/Header";
import DetailsCard from "./components/PurchaseDetails";
import TotalCard from "./components/TotalCard";

export default function ProjectReceiptDetailsPage() {
  const { id: projectId, receiptId } = useParams();
  const { getReceiptById } = useReceiptStore();

  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;
  const receiptIdString = Array.isArray(receiptId) ? receiptId[0] : receiptId;
  const receipt = getReceiptById(receiptIdString || "");

  if (receipt && receipt.projectId !== projectIdString) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>This receipt doesn&lsquo;t belong to the current project.</p>
        <a href={`/projects/${projectIdString}/receipts`}>
          Back to Project Receipts
        </a>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div>
        <h1>Receipt Not Found</h1>
        <p>The receipt you are looking for does not exist.</p>
        <a href={`/projects/${projectIdString}/receipts`}>
          Back to Project Receipts
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col p-4 md:px-8 lg:px-16 text-white gap-[20px]">
      <ReceiptsHeader receipt={receipt} />
      <DetailsCard receiptId={receiptIdString || ""} />
      <ItemsCard receiptId={receiptIdString || ""} />
      <TotalCard receiptId={receiptIdString || ""} />
    </div>
  );
}
