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
      <div className="h-full w-full">
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
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              min: 0,
              tickAmount: 2,
              labels: {
                style: { colors: "#9CA3AF", fontSize: "12px" },
              },
            },
            grid: {
              borderColor: "#F3F0F8",
              strokeDashArray: 0,
            },
            fill: {
              colors: ["#8B5CF6", "#5EEAD4"],
            },
            legend: {
              show: false,
            },
          }}
        />
      </div>
    </>
  );
};

export default BarChart;
