"use client";

import { useState, useEffect } from "react";
import {
  MonthlyReportChart,
  BarChart,
  OverallReportChart,
  TabContent,
  TabNavItem,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { getWeeklyReport, getMonthlyReport, getOverallReport } from "@/actions/student_report_actions";
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
  const [weeklyReportData, setWeeklyReportData] = useState<any>(null);
  const [monthlyReportData, setMonthlyReportData] = useState<any>(null);
  const [overallReportData, setOverallReportData] = useState<any>(null);
  const [weeklyReportLoading, setWeeklyReportLoading] = useState(false);
  const [monthlyReportLoading, setMonthlyReportLoading] = useState(false);
  const [overallReportLoading, setOverallReportLoading] = useState(false);

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      setWeeklyReportLoading(true);
      try {
        const result = await getWeeklyReport();
        setWeeklyReportData(result);
      } catch (error: any) {
        console.error("Error fetching weekly report:", error);
      } finally {
        setWeeklyReportLoading(false);
      }
    };

    fetchWeeklyReport();
  }, []);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      setMonthlyReportLoading(true);
      try {
        const result = await getMonthlyReport();
        setMonthlyReportData(result);
      } catch (error: any) {
        console.error("Error fetching monthly report:", error);
      } finally {
        setMonthlyReportLoading(false);
      }
    };

    fetchMonthlyReport();
  }, []);

  useEffect(() => {
    const fetchOverallReport = async () => {
      setOverallReportLoading(true);
      try {
        const result = await getOverallReport();
        setOverallReportData(result);
      } catch (error: any) {
        console.error("Error fetching overall report:", error);
      } finally {
        setOverallReportLoading(false);
      }
    };

    fetchOverallReport();
  }, []);

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
