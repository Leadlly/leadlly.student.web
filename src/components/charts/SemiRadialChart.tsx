"use client";

import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <SemiRadialChartSkeleton />,
});

import { TSemiRadialChartProps } from "@/helpers/types";

import { cn } from "@/lib/utils";
import SemiRadialChartSkeleton from "./_skeletons/SemiRadialChartSkeleton";

const SemiRadialChart = ({
  series = [],
  colors = [],
  chartLabel,
}: TSemiRadialChartProps) => {
  return (
    <>
      <Charts
        width={180}
        height={180}
        type="radialBar"
        series={series}
        options={{
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "rgba(98, 0, 238, 0.1)",
                strokeWidth: "100%",
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  fontSize: "18px",
                  fontWeight: "600",
                  offsetY: 8,
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
          fill: {
            type: "colors",
            colors: colors,
          },
          stroke: {
            lineCap: "round",
          },
        }}
      />

      <div className="w-full flex items-center justify-center gap-1">
        <span
          className={cn(
            "w-2 h-2 rounded-[2px] -mt-[2px]",
            chartLabel === "revision" ? "bg-primary" : "bg-[#56CFE1]"
          )}
        ></span>
        <p className="text-xs capitalize">{chartLabel}</p>
      </div>
    </>
  );
};

export default SemiRadialChart;
