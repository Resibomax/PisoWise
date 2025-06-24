import { create } from "zustand";
import { mockAIInsights, type AIInsight } from "@/app/projects/mockProject";

interface AIInsightsState {
  insights: AIInsight[];
  loading: boolean;
  getInsightsByProjectId: (projectId: string) => AIInsight[];
  fetchInsights: () => Promise<void>;
  addInsight: (insight: Omit<AIInsight, "id" | "generatedAt">) => void;
}

export const useAIInsightsStore = create<AIInsightsState>((set, get) => ({
  insights: [],
  loading: false,

  getInsightsByProjectId: (projectId: string) => {
    const { insights } = get();
    return insights.filter((insight) => insight.projectId === projectId);
  },

  fetchInsights: async () => {
    set({ loading: true });

    set({
      insights: mockAIInsights,
      loading: false,
    });
  },

  addInsight: (newInsight) => {
    const insight: AIInsight = {
      ...newInsight,
      id: `ai-${Date.now()}`,
      generatedAt: new Date().toISOString(),
    };

    set((state) => ({
      insights: [...state.insights, insight],
    }));
  },
}));
