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
  
];
