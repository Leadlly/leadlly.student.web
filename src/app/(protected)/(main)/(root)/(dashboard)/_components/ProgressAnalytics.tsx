"use client";

import { useState } from "react";
import {
  MonthlyReportChart,
  BarChart,
  OverallReportChart,
  TabContent,
  TabNavItem,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { useGetWeeklyReport } from "@/queries/studentReportQueries";
import { useGetMonthlyReport } from "@/queries/studentReportQueries";
import { useGetOverallReport } from "@/queries/studentReportQueries";
import { Skeleton } from "@/components/ui/skeleton";

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
    useGetWeeklyReport();
  const { data: monthlyReportData, isLoading: monthlyReportLoading } =
    useGetMonthlyReport();
  const { data: overallReportData, isLoading: overallReportLoading } =
    useGetOverallReport();

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
