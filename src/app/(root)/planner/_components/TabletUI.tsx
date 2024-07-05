import { PlannerDataProps, TDayProps } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";
import RevisionZone from "./RevisionZone";
import WeeklyPlan from "./WeeklyPlan";

const TabletUI = ({
  todaysTopics,
  plannerData,
  setData,
}: {
  todaysTopics: TDayProps | null;
  plannerData: PlannerDataProps;
  setData: (data: TDayProps | null) => void;
}) => {
  return (
    <section className="hidden md:flex flex-col gap-4 overflow-y-auto custom__scrollbar pr-3 xl:hidden">
      <div className="grid grid-cols-2 gap-4">
        <TodaysPlan todaysTopics={todaysTopics} />

        <RevisionZone />
      </div>

      <WeeklyPlan data={plannerData} setData={setData} />
    </section>
  );
};

export default TabletUI;
