import { ReactNode } from "react";

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
