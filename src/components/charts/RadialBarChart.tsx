"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import RadialBarChartSkeleton from "./_skeletons/RadialBarChartSkeleton";
import { ISubject } from "@/helpers/types";
const Charts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <RadialBarChartSkeleton />,
});

type RadialBarChartProps = {
  series: number[];
  colors: string[];
  labels: string[];
  dataLabel: string;
  width: string;
  hollowSize: string;
  fontSize?: string;
  subject?: ISubject;
};

const RadialBarChart = ({
  series,
  colors,
  labels,
  dataLabel,
  width,
  hollowSize,
  fontSize,
  subject,
}: RadialBarChartProps) => {
  return (
    <div className="relative h-full">
      <Charts
        type="radialBar"
        width={width}
        height={"100%"}
        series={series}
        options={{
          chart: {
            height: "100%",
            type: "radialBar",
          },
          colors: colors,
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: hollowSize,
              },
              dataLabels: {
                show: labels.includes("No. of Questions Solved") ? false : true,
                value: {
                  fontSize: fontSize ?? "18px",
                  fontWeight: 600,
                  fontFamily: "Mada,sans-serif",
                  offsetY: 2,
                },
                name: {
                  show: false,
                },
                total: {
                  show: true,
                  formatter: function (w) {
                    const sum = w?.globals?.series.reduce(
                      (acc: number, value: number) => acc + value,
                      0
                    );

                    const average = sum / w?.globals?.series.length;

                    const averagePercentage = Math.round((average / 100) * 100);

                    return `${averagePercentage}%`;
                  },
                },
              },
            },
          },
          labels: labels,
          stroke: {
            lineCap: "round",
          },
        }}
      />

      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        {labels.includes("No. of Questions Solved") && (
          <p className="text-2xl font-semibold text-center">
            {subject?.total_questions_solved.number! > 120
              ? "120+"
              : subject?.total_questions_solved.number}
          </p>
        )}
        <p
          className={cn(
            "text-sm font-medium mt-8 capitalize",
            dataLabel === "overall" ? "text-[10px] text-[#a9a9a9]" : "",
            dataLabel === "questions" ? "-mt-[2px]" : ""
          )}
        >
          {dataLabel}
        </p>
      </div>
    </div>
  );
};

export default RadialBarChart;
