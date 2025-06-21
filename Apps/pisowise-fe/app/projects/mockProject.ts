import type { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  spent: number;
  headerAction?: ReactNode;
  className?: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "PWA Development",
    description: "Develop a mobile app for e-commerce platform.",
    budget: 50000,
    spent: 32000,
  },
  {
    id: "2",
    title: "Website Redesign",
    description: "Redesign the company website to improve user experience.",
    budget: 20000,
    spent: 15000,
  },
  {
    id: "3",
    title: "AWSCC Website",
    description: "Redesign the company website to improve user experience.",
    budget: 20000,
    spent: 15000,
  },
];

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ReceiptDetails {
  id: string;
  projectId: string;
  title: string;
  date: string;
  totalAmount: number;
  items: ReceiptItem[];
  totalItems: number;
  receiptImage: string;
}

export const mockReceipts: ReceiptDetails[] = [
  {
    id: "1",
    projectId: "1",
    title: "Receipt 1",
    date: "2023-10-01",
    totalAmount: 150.75,
    items: [
      { id: "1", name: "Printer Paper", price: 20.0, quantity: 2 },
      { id: "2", name: "Pens", price: 5.5, quantity: 10 },
      { id: "3", name: "Stapler", price: 15.0, quantity: 1 },
    ],
    totalItems: 13,
    receiptImage: "https://example.com/receipt1.jpg",
  },
  {
    id: "2",
    projectId: "1",
    title: "Receipt 2",
    date: "2023-10-05",
    totalAmount: 4020.69,
    items: [
      { id: "1", name: "Bananas", price: 69.93, quantity: 2 },
      { id: "2", name: "Gardenia Bread", price: 90.31, quantity: 1 },
      { id: "3", name: "Muriatic Acid", price: 100.93, quantity: 1 },
      { id: "4", name: "Dildo", price: 169.69, quantity: 1 },
    ],
    totalItems: 5,
    receiptImage: "/images/receipt-sample.png",
  },
  {
    id: "3",
    projectId: "2",
    title: "Receipt 1",
    date: "2023-10-10",
    totalAmount: 299.99,
    items: [
      { id: "1", name: "Adobe Creative Suite", price: 299.99, quantity: 1 },
    ],
    totalItems: 1,
    receiptImage: "https://example.com/receipt3.jpg",
  },
  {
    id: "4",
    projectId: "3",
    title: "Receipt 1",
    date: "2023-10-15",
    totalAmount: 89.99,
    items: [
      { id: "1", name: "EC2 Instance", price: 49.99, quantity: 1 },
      { id: "2", name: "S3 Storage", price: 25.0, quantity: 1 },
      { id: "3", name: "CloudFront CDN", price: 15.0, quantity: 1 },
    ],
    totalItems: 3,
    receiptImage: "https://example.com/receipt4.jpg",
  },
];
