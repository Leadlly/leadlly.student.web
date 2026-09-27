"use client";

import dynamic from "next/dynamic";
import BarChartSkeleton from "./_skeletons/BarChartSkeleton";
import {
  ProgressAnalyticsDataProps,
  TStudentReportProps,
} from "@/helpers/types";
const Charts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const BarChart = ({
  weeklyProgress,
}: {
  weeklyProgress: TStudentReportProps | null;
}) => {
  const sessionData = weeklyProgress
    ? weeklyProgress?.days.map((data) => Math.round(data.session))
    : [];

  const quizData = weeklyProgress
    ? weeklyProgress?.days.map((data) => Math.round(data.quiz))
    : [];

  const days = weeklyProgress
    ? weeklyProgress?.days.map((data) => data.day.slice(0, 3))
    : [];
  return (
    <>
      <div className="flex-1">
        <Charts
          type="bar"
          width={"100%"}
          height={"100%"}
          series={[
            {
              name: "Revisions",
              data:
                sessionData && sessionData.length
                  ? sessionData
                  : [0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: "Quizzes",
              data:
                quizData && quizData.length ? quizData : [0, 0, 0, 0, 0, 0, 0],
            },
          ]}
          options={{
            chart: {
              type: "bar",
              height: "100%",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: 14,
                borderRadius: 1.5,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 3,
              colors: ["transparent"],
            },
            xaxis: {
              categories:
                days && days.length
                  ? days
                  : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            fill: {
              colors: ["#9654F4", "#56CFE1"],
            },
            legend: {
              show: false,
            },
          }}
        />
      </div>

      <div className="w-36 hidden md:block">
        <div className="flex items-center gap-2">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#8B5CF6]"></span>
          <span className="text-xs">Topics revised</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#56CFE1]"></span>
          <span className="text-xs">Revision accuracy</span>
        </div>
      </div>
    </>
  );
};

export default BarChart;
