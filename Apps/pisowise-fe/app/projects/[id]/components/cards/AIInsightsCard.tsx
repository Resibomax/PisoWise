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
        "bg-[#1B1212] border-none shadow-lg hover:shadow-xl transition-shadow lg:h-[275px] lg:flex lg:flex-col",
      )}
    >
      <CardContent className="p-5 lg:flex lg:flex-col lg:h-[275px] ">
        <div className="lg:flex-shrink-0 mb-4">
          <p className="font-[Ember] text-[24px] md:text-[30px] text-white">
            AI Insights
          </p>
          <p className="font-roboto-light text-[14px] md:text-[18px] text-white">
            AI-generated project analysis
          </p>
        </div>

        {/* Content - Scrollable on large screens only */}
        <div className="border border-[#349868] rounded-[12px] lg:flex-1 lg:min-h-0 lg:overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center lg:h-full p-4">
              <div className="text-gray-400 text-sm">Loading insights...</div>
            </div>
          ) : insights.length > 0 ? (
            <div className="px-[20px] py-[24px] space-y-3">
              {insights.map((insight) => (
                <div key={insight.id}>
                  <p className="text-white font-roboto-light text-[14px] md:text-[16px] leading-relaxed">
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center lg:h-full p-4">
              <div className="text-gray-400 text-sm text-center">
                No AI insights available for this project yet.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
