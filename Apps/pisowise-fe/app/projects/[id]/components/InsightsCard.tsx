"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAIInsightsStore } from "@/app/store/projectDetails/insightsStore";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface AIInsightsDisplayProps {
  projectId: string;
}

export default function InsightsCard({ projectId }: AIInsightsDisplayProps) {
  const { getInsightsByProjectId, fetchInsights, loading } =
    useAIInsightsStore();

  const insights = getInsightsByProjectId(projectId);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <Card
      className={cn(
        "bg-[#1B1212] border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow",
      )}
    >
      <CardContent className="p-5">
        <div className="text-white mb-4">
          <p className="font-[Ember] text-[24px]">AI Insights</p>
          <p className="font-roboto-light text-[14px]">
            AI-generated project analysis
          </p>
        </div>

        <div className="border border-[#349868] rounded-[12px] min-h-[100px] flex items-center justify-center flex-col">
          {loading ? (
            <div className="text-gray-400 text-sm">Loading insights...</div>
          ) : insights.length > 0 ? (
            insights.map((insight) => (
              <div key={insight.id} className=" p-3 ">
                <p className="text-white text-sm font-roboto-light leading-relaxed">
                  {insight.message}
                </p>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm ">
              No AI insights available for this project yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
