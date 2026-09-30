"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyReport } from "@/actions/student_report_actions";
import BarChartSkeleton from "@/components/charts/_skeletons/BarChartSkeleton";
import { useAppSelector } from "@/redux/hooks";

const Charts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const istDay = (value?: Date | string | null) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsed);
};

const sameIstDay = (value?: Date | string | null) =>
  Boolean(value) && istDay(value) === istDay(new Date());

const DailyReport = () => {
  const userDailyReport = useAppSelector(
    (state) => state.user.user?.details?.report?.dailyReport
  );
  const { data: weeklyReportData } = useQuery({
    queryKey: ["weeklyReport"],
    queryFn: getWeeklyReport,
  });
  const todayFromWeek = weeklyReportData?.weeklyReport?.days?.find((day) =>
    sameIstDay(day.date)
  );
  const savedToday = sameIstDay(userDailyReport?.date) ? userDailyReport : null;
  const topics = Math.round(Number(todayFromWeek?.session ?? savedToday?.session ?? 0));
  const accuracy = Math.round(Number(todayFromWeek?.quiz ?? savedToday?.quiz ?? 0));

  return (
    <div className="px-5 py-4">
      <h4 className="text-lg font-semibold text-dark-primary">Today&apos;s daily report</h4>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-3xl font-semibold text-dark-primary">{topics}%</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-secondary-text">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#8B5CF6]" />
              Topics revised
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-dark-primary">{accuracy}%</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-secondary-text">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#5CDBE8]" />
              Revision accuracy
            </p>
          </div>
        </div>
        <div className="h-[180px] min-w-0 flex-1">
          <Charts
            type="bar"
            width="100%"
            height="100%"
            series={[
              { name: "Revisions", data: [topics] },
              { name: "Quizzes", data: [accuracy] },
            ]}
            options={{
              chart: {
                type: "bar",
                toolbar: { show: false },
                parentHeightOffset: 0,
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "72%",
                  borderRadius: 4,
                  borderRadiusApplication: "end",
                },
              },
              dataLabels: { enabled: false },
              stroke: {
                show: true,
                width: 6,
                colors: ["transparent"],
              },
              xaxis: {
                categories: ["Today"],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
              },
              yaxis: {
                min: 0,
                max: 100,
                tickAmount: 2,
                labels: {
                  style: { colors: "#9CA3AF", fontSize: "12px" },
                },
              },
              grid: {
                borderColor: "#F3F0F8",
                strokeDashArray: 0,
              },
              colors: ["#8B5CF6", "#5CDBE8"],
              fill: {
                colors: ["#8B5CF6", "#5CDBE8"],
              },
              legend: { show: false },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
