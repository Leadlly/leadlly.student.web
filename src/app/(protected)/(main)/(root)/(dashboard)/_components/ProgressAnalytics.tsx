"use client";

import { useState } from "react";
import {
  MonthlyReportChart,
  BarChart,
  OverallReportChart,
  TabContent,
  TabNavItem,
} from "@/components";
import {
  getWeeklyReport,
  getMonthlyReport,
  getOverallReport,
} from "@/actions/student_report_actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";

const progressAnalyticsMenus = [
  {
    id: "weekly",
    title: "Weekly",
  },
  {
    id: "monthly",
    title: "Monthly",
  },
  {
    id: "overall",
    title: "Overall",
  },
];

const ProgressAnalytics = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  const { data: weeklyReportData, isLoading: weeklyReportLoading } =
    useSuspenseQuery({
      queryKey: ["weeklyReport"],
      queryFn: getWeeklyReport,
    });

  const { data: monthlyReportData, isLoading: monthlyReportLoading } =
    useSuspenseQuery({
      queryKey: ["monthlyReport"],
      queryFn: getMonthlyReport,
    });

  const { data: overallReportData, isLoading: overallReportLoading } =
    useSuspenseQuery({
      queryKey: ["overallReport"],
      queryFn: getOverallReport,
    });

  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs md:text-sm font-bold">Progress Analytics</h4>
        <ul className="flex items-center gap-1 border p-[2px] rounded-md">
          {progressAnalyticsMenus.map((tab) => (
            <TabNavItem
              key={tab.id}
              title={tab.title}
              id={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="progress_analytics"
              activeTabClassName="h-full inset-0"
            />
          ))}
        </ul>
      </div>

      <div className="w-full h-full overflow-hidden">
        <TabContent id="weekly" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            {weeklyReportLoading ? (
              <div className="h-[150px] w-full mt-2">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <BarChart weeklyProgress={weeklyReportData?.weeklyReport} />
            )}
          </div>
        </TabContent>
        <TabContent id="monthly" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            {monthlyReportLoading ? (
              <div className="h-[150px] w-full mt-2">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <MonthlyReportChart progress={monthlyReportData?.monthlyReport} />
            )}
          </div>
        </TabContent>
        <TabContent id="overall" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            {overallReportLoading ? (
              <div className="h-[150px] w-full mt-2">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <OverallReportChart progress={overallReportData?.overallReport} />
            )}
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
