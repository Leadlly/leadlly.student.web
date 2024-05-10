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
    <section className="hidden xl:grid grid-cols-2 gap-6">
      <div className="grid grid-rows-2 gap-6">
        <TodaysPlan todaysTopics={todaysTopics} />

        <RevisionZone />
      </div>

      <WeeklyPlan />
    </section>
  );
};

export default DesktopUI;
