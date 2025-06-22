"use client";

import { useParams } from "next/navigation";
import { useReceiptStore } from "@/app/store/projectDetails/receiptsStore";

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
    <div>
      <h1>{receipt.title}</h1>
      <p>
        Date:{" "}
        {new Date(receipt.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p>Total Amount: ₱{receipt.totalAmount.toFixed(2)}</p>
      <p>Total Items: {receipt.totalItems}</p>
      <h2>Items:</h2>
      <ul>
        {receipt.items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity} ₱{item.price.toFixed(2)} = ₱
            {(item.quantity * item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: ₱{receipt.totalAmount.toFixed(2)}</p>
    </div>
  );
}
