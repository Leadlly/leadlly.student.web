"use client";

import { formatDate } from "@/helpers/utils";
import { useAppSelector } from "@/redux/hooks";

const DailyReport = () => {
  const daily = useAppSelector((state) => state.user.user?.details?.report?.dailyReport);
  const isToday =
    !!daily?.date && formatDate(daily.date) === formatDate(new Date(Date.now()));
  const topics = isToday ? Number(daily?.session || 0) : 0;
  const accuracy = isToday ? Number(daily?.quiz || 0) : 0;
  const lastDate = daily?.date ? formatDate(new Date(daily.date)) : "";

  return (
    <div className="px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold text-dark-primary">Today&apos;s daily report</h4>
        {lastDate ? (
          <p className="shrink-0 text-xs text-secondary-text">Last {lastDate}</p>
        ) : null}
      </div>
      <div className="mt-4 flex items-center gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-3xl font-semibold text-dark-primary">{Math.round(topics)}%</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-secondary-text">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
              Topics revised
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-dark-primary">{Math.round(accuracy)}%</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-secondary-text">
              <span className="h-2.5 w-2.5 rounded-full bg-[#56CFE1]" />
              Revision accuracy
            </p>
          </div>
        </div>
        <div className="flex h-28 flex-1 items-end justify-center gap-6 rounded-[22px] bg-[#F7F5FB] px-6">
          {[
            { value: topics, color: "#8B5CF6" },
            { value: accuracy, color: "#56CFE1" },
          ].map((bar) => (
            <div
              key={bar.color}
              className="w-8 rounded-t-2xl"
              style={{
                height: `${Math.max(8, Math.min(bar.value, 100))}%`,
                backgroundColor: bar.color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
