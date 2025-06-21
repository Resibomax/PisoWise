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
    spent: 42000,
  },
  {
    id: "2",
    title: "Website Redesign",
    description: "Redesign the company website to improve user experience.",
    budget: 20000,
    spent: 13690,
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
    id: "5",
    projectId: "1",
    title: "Receipt 3",
    date: "2023-10-15",
    totalAmount: 250.0,
    items: [
      { id: "1", name: "Office Chair", price: 150.0, quantity: 1 },
      { id: "2", name: "Desk Lamp", price: 50.0, quantity: 2 },
    ],
    totalItems: 3, // 1 + 2
    receiptImage: "https://example.com/receipt3.jpg",
  },
];

export interface AIInsight {
  id: string;
  projectId: string;
  message: string;
  generatedAt: string;
}

export const mockAIInsights: AIInsight[] = [
  {
    id: "ai-1",
    projectId: "1",
    message:
      "Current spending trajectory suggests you may exceed budget by 15% if current pace continues. Consider optimizing development resources.",
    generatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ai-2",
    projectId: "1",
    message:
      "Implementing automated testing tools could reduce debugging time by 25% and improve delivery speed.",
    generatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "ai-3",
    projectId: "1",
    message:
      "Analysis shows potential savings of $2,000 by switching to alternative payment processing solutions.",
    generatedAt: "2024-01-13T09:15:00Z",
  },

  {
    id: "ai-4",
    projectId: "2",
    message:
      "Your Adobe Creative Suite investment shows high ROI. Consider expanding design capabilities to reduce outsourcing costs.",
    generatedAt: "2024-01-15T11:45:00Z",
  },
  {
    id: "ai-5",
    projectId: "2",
    message:
      "Based on current spending patterns, project is likely to finish 10% under budget with 3 days ahead of schedule.",
    generatedAt: "2024-01-14T16:30:00Z",
  },
  {
    id: "ai-6",
    projectId: "2",
    message:
      "Consider adding user testing sessions to validate design decisions before final implementation.",
    generatedAt: "2024-01-13T12:20:00Z",
  },

  {
    id: "ai-7",
    projectId: "3",
    message:
      "AWS spending analysis suggests switching to reserved instances could save 30% on compute costs.",
    generatedAt: "2024-01-15T08:20:00Z",
  },
  {
    id: "ai-8",
    projectId: "3",
    message:
      "Current infrastructure setup may require additional security measures to meet compliance standards.",
    generatedAt: "2024-01-14T13:10:00Z",
  },
  {
    id: "ai-9",
    projectId: "3",
    message:
      "Adding CloudWatch monitoring could prevent potential downtime and improve system reliability.",
    generatedAt: "2024-01-13T15:45:00Z",
  },
];
