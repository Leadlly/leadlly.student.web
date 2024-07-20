"use client";

import { TStudentReportProps } from "@/helpers/types";
import { formatDate } from "@/helpers/utils";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const MonthlyReportChart = ({
  progress,
}: {
  progress: TStudentReportProps | null;
}) => {
  const sessionData = progress
    ? progress?.days.map((data) => Math.round(data.session))
    : [];

  const quizData = progress
    ? progress?.days.map((data) => Math.round(data.quiz))
    : [];

  const startDayMonth =
    progress && progress.startDate
      ? formatDate(new Date(progress?.startDate!))
      : "1 Jul";
  const endDayMonth =
    progress && progress.startDate
      ? formatDate(new Date(progress?.endDate!))
      : "31 Jul";
  return (
    <>
      <div className="flex-1">
        <Charts
          type="area"
          width={"100%"}
          height={140}
          series={[
            {
              name: "Revision Session",
              data:
                sessionData && sessionData.length
                  ? sessionData
                  : Array.from({ length: 30 }).map((_, i) => 0),
            },
            {
              name: "Quizzes",
              data:
                quizData && quizData.length
                  ? quizData
                  : Array.from({ length: 30 }).map((_, i) => 0),
            },
          ]}
          options={{
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: [1, 1],
            },
            xaxis: {
              type: "category",
              categories: [startDayMonth, endDayMonth],
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
    </>
  );
};

export default MonthlyReportChart;
