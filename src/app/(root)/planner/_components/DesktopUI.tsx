import React from "react";
import TodaysPlan from "./TodaysPlan";
import RevisionZone from "./RevisionZone";
import WeeklyPlan from "./WeeklyPlan";
import { TPlannerTodaysTopic } from "@/helpers/types";

const DesktopUI = ({
  todaysTopics,
}: {
  todaysTopics: TPlannerTodaysTopic[];
}) => {
  return (
    <section className="hidden xl:grid grid-cols-2 gap-6 overflow-y-auto custom__scrollbar">
      <div className="grid grid-rows-2 gap-6">
        <div className="rounded-xl border flex flex-col justify-start overflow-hidden">
          <TodaysPlan todaysTopics={todaysTopics} />
        </div>

        <div className="rounded-xl py-4 border">
          <RevisionZone />
        </div>
      </div>
      <div className="border rounded-xl overflow-x-hidden overflow-y-auto custom__scrollbar">
        <WeeklyPlan />
      </div>
    </section>
  );
};

export default DesktopUI;
