"use client";

import { TStudentOverallReportProps } from "@/helpers/types";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const OverallReportChart = ({
  progress,
}: {
  progress: TStudentOverallReportProps[] | null;
}) => {
  const sessionData =
    progress && progress.length
      ? progress?.map((data) => Math.round(data.session))
      : [0];

  const quizData =
    progress && progress.length
      ? progress.map((data) => Math.round(data.quiz))
      : [0];

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
              data: sessionData,
            },
            {
              name: "Quizzes",
              data: quizData,
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

export default OverallReportChart;
