import { TPlannerTodaysTopic } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";
import RevisionZone from "./RevisionZone";
import WeeklyPlan from "./WeeklyPlan";

const TabletUI = ({
  todaysTopics,
}: {
  todaysTopics: TPlannerTodaysTopic[];
}) => {
  return (
    <section className="hidden md:flex flex-col gap-4 overflow-y-auto custom__scrollbar pr-3 xl:hidden">
      <div className="grid grid-cols-2 gap-4">
        <TodaysPlan todaysTopics={todaysTopics} />

        <RevisionZone />
      </div>

      <WeeklyPlan />
    </section>
  );
};

export default TabletUI;
