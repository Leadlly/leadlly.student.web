import React from "react";
import TodaysPlan from "./TodaysPlan";
import RevisionZone from "./RevisionZone";
import WeeklyPlan from "./WeeklyPlan";
import { PlannerDataProps, TDayProps } from "@/helpers/types";

const DesktopUI = ({
  todaysTopics,
  plannerData,
  setData,
}: {
  todaysTopics: TDayProps | null;
  plannerData: PlannerDataProps;
  setData: (data: TDayProps | null) => void;
}) => {
  return (
    <section className="hidden xl:grid grid-cols-2 gap-6 overflow-y-auto custom__scrollbar pr-3">
      <div className="grid grid-rows-2 gap-6">
        <TodaysPlan todaysTopics={todaysTopics} />

        <RevisionZone />
      </div>

      <WeeklyPlan data={plannerData} setData={setData} />
    </section>
  );
};

export default DesktopUI;
