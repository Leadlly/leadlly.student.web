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

  const weeklyReportData = useAppSelector((state) => state.weeklyReport.report);
  const monthlyReportData = useAppSelector(
    (state) => state.monthlyReport.report
  );
  const overallReportData = useAppSelector(
    (state) => state.overallReport.report
  );

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
            <BarChart weeklyProgress={weeklyReportData} />
          </div>
        </TabContent>
        <TabContent id="monthly" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <MonthlyReportChart progress={monthlyReportData} />
          </div>
        </TabContent>
        <TabContent id="overall" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <OverallReportChart progress={overallReportData} />
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
