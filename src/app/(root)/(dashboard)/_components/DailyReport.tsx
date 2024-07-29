"use client";

import { RadialBarChart } from "@/components";
import { formatDate } from "@/helpers/utils";
import { useAppSelector } from "@/redux/hooks";

const DailyReport = () => {
  const userDetails = useAppSelector((state) => state.user.user?.details);
  return (
    <div className="px-3 py-2">
      <h4 className="text-xs md:text-sm font-bold">Daily Report</h4>
      <div className="flex items-center justify-center">
        <RadialBarChart
          series={[
            userDetails?.report?.dailyReport?.date &&
            formatDate(userDetails?.report?.dailyReport?.date!) ===
              formatDate(new Date(Date.now()))
              ? userDetails?.report?.dailyReport?.session!
              : 0,
            userDetails?.report?.dailyReport?.date &&
            formatDate(userDetails?.report?.dailyReport?.date!) ===
              formatDate(new Date(Date.now()))
              ? userDetails?.report?.dailyReport?.quiz!
              : 0,
          ]}
          colors={["#9654F4", "#72EFDD"]}
          labels={["Sessions", "Quizzes"]}
          dataLabel="overall"
          width="90%"
          hollowSize="45%"
          fontSize="18px"
        />

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" block w-3 h-3 rounded bg-primary"></span>
            <span className="text-xs capitalize">Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className=" block w-3 h-3 rounded bg-[#72EFDD]"></span>
            <span className="text-xs capitalize">Quizzes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
