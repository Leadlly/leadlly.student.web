"use client";

import { RadialBarChart } from "@/components";
import BarChartSkeleton from "@/components/charts/_skeletons/BarChartSkeleton";
import { formatDate } from "@/helpers/utils";
import { useAppSelector } from "@/redux/hooks";
import dynamic from "next/dynamic";

const Charts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DailyReport = () => {
  const userDetails = useAppSelector((state) => state.user.user?.details);
  return (
    <div className="px-3 py-2">
      <h4 className="text-xs md:text-sm font-bold">Today</h4>
      <div className="flex items-center justify-center">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-semibold">
              {userDetails?.report?.dailyReport?.date &&
              formatDate(userDetails?.report?.dailyReport?.date!) ===
                formatDate(new Date(Date.now()))
                ? userDetails?.report?.dailyReport?.session!
                : 0}
              %
            </span>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-primary"></div>
              <span className="text-base md:text-lg font-medium">
                Topics Revised
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-semibold">
              {userDetails?.report?.dailyReport?.date &&
              formatDate(userDetails?.report?.dailyReport?.date!) ===
                formatDate(new Date(Date.now()))
                ? userDetails?.report?.dailyReport?.quiz!
                : 0}
              %
            </span>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-[#56CFE1]"></div>
              <span className="text-base md:text-lg font-medium">
                Revision Accuracy
              </span>
            </div>
          </div>
        </div>

        <div>
          <Charts
            type="bar"
            width={"50%"}
            height={"100%"}
            series={[
              {
                data: [
                  {
                    x: "S",
                    y:
                      userDetails?.report?.dailyReport?.date &&
                      formatDate(userDetails?.report?.dailyReport?.date!) ===
                        formatDate(new Date(Date.now()))
                        ? userDetails?.report?.dailyReport?.session!
                        : 0,
                    fillColor: "#9654F4",
                  },
                  {
                    x: "Q",
                    y:
                      userDetails?.report?.dailyReport?.date &&
                      formatDate(userDetails?.report?.dailyReport?.date!) ===
                        formatDate(new Date(Date.now()))
                        ? userDetails?.report?.dailyReport?.quiz!
                        : 0,
                    fillColor: "#56CFE1",
                  },
                ],
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
                  columnWidth: 20,
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
                axisBorder: {
                  show: true,
                },
                labels: {
                  show: false,
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              legend: {
                show: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
