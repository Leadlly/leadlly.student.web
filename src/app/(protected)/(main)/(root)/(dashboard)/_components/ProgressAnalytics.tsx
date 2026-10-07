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
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const average = (values: number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

const periodChange = (values: number[]) => {
  if (values.length < 2) return 0;
  const mid = Math.floor(values.length / 2);
  const earlier = average(values.slice(0, mid));
  const later = average(values.slice(mid));
  if (earlier === 0) return later === 0 ? 0 : 100;
  return ((later - earlier) / earlier) * 100;
};

const formatRange = (start?: string, end?: string) => {
  if (!start || !end) return "";
  const label = (value: string) => {
    const date = new Date(value);
    return `${date.getDate()} ${date.toLocaleString("en", { month: "short" })} ${date.getFullYear()}`;
  };
  return `${label(start)} - ${label(end)}`;
};

const ChangeStat = ({ label, value }: { label: string; value: number }) => {
  const up = value >= 0;
  return (
    <div className="text-center">
      <p className="text-sm text-secondary-text">{label}</p>
      <p className={cn("mt-1 text-lg font-semibold", up ? "text-[#16A34A]" : "text-[#E11D48]")}>
        {up ? "↑" : "↓"} {Math.abs(Math.round(value))}% {up ? "more" : "less"}
      </p>
    </div>
  );
};

const ReportSummary = ({
  range,
  topics,
  accuracy,
}: {
  range: string;
  topics: number;
  accuracy: number;
}) => (
  <div className="mt-6 grid grid-cols-3 items-start gap-3">
    <ChangeStat label="Topics revised" value={topics} />
    <p className="pt-1 text-center text-sm text-secondary-text">{range}</p>
    <ChangeStat label="Revision accuracy" value={accuracy} />
  </div>
);

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
    useQuery({
      queryKey: ["weeklyReport"],
      queryFn: getWeeklyReport,
    });

  const { data: monthlyReportData, isLoading: monthlyReportLoading } =
    useQuery({
      queryKey: ["monthlyReport"],
      queryFn: getMonthlyReport,
    });

  const { data: overallReportData, isLoading: overallReportLoading } =
    useQuery({
      queryKey: ["overallReport"],
      queryFn: getOverallReport,
    });

  const weekly = weeklyReportData?.weeklyReport;
  const monthly = monthlyReportData?.monthlyReport;
  const overall = overallReportData?.overallReport;
  const weeklySummary = {
    range: formatRange(weekly?.startDate, weekly?.endDate),
    topics: periodChange((weekly?.days ?? []).map((day) => day.session)),
    accuracy: periodChange((weekly?.days ?? []).map((day) => day.quiz)),
  };
  const monthlySummary = {
    range: formatRange(monthly?.startDate, monthly?.endDate),
    topics: periodChange((monthly?.days ?? []).map((day) => day.session)),
    accuracy: periodChange((monthly?.days ?? []).map((day) => day.quiz)),
  };
  const overallDays = overall ?? [];
  const overallSummary = {
    range: formatRange(overallDays[0]?.date, overallDays[overallDays.length - 1]?.date),
    topics: periodChange(overallDays.map((day) => day.session)),
    accuracy: periodChange(overallDays.map((day) => day.quiz)),
  };

  return (
    <div className="px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-lg font-semibold text-dark-primary">Progress analytics</h4>
        <ul className="flex items-center gap-1 rounded-full bg-[#F4F1FB] p-1">
          {progressAnalyticsMenus.map((tab) => (
            <TabNavItem
              key={tab.id}
              title={tab.title}
              id={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="progress_analytics"
              activeTabClassName="inset-0 h-full rounded-full"
              className="rounded-full px-3 py-1"
            />
          ))}
        </ul>
      </div>

      <div className="w-full h-full overflow-hidden">
        <TabContent id="weekly" activeTab={activeTab}>
          {weeklyReportLoading ? (
            <div className="mt-4 h-[280px] w-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <>
              <ReportSummary {...weeklySummary} />
              <div className="mt-2 h-[280px]">
                <BarChart weeklyProgress={weekly ?? null} />
              </div>
            </>
          )}
        </TabContent>
        <TabContent id="monthly" activeTab={activeTab}>
          {monthlyReportLoading ? (
            <div className="mt-4 h-[280px] w-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <>
              <ReportSummary {...monthlySummary} />
              <div className="mt-2 h-[280px]">
                <MonthlyReportChart progress={monthly ?? null} />
              </div>
            </>
          )}
        </TabContent>
        <TabContent id="overall" activeTab={activeTab}>
          {overallReportLoading ? (
            <div className="mt-4 h-[280px] w-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <>
              <ReportSummary {...overallSummary} />
              <div className="mt-2 h-[280px]">
                <OverallReportChart progress={overall ?? null} />
              </div>
            </>
          )}
        </TabContent>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
