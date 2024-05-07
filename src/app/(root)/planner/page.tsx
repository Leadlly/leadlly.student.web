import { Header } from "@/components";

import RevisionZone from "./_components/RevisionZone";
import TodaysPlan from "./_components/TodaysPlan";
import WeeklyPlan from "./_components/WeeklyPlan";
import DesktopUI from "./_components/DesktopUI";
import TabletUI from "./_components/TabletUI";

const todaysTopics = [
  {
    subject: "Mathematics",
    topics: "Limits,continuity, and differentiability.",
  },
  {
    subject: "Physics",
    topics: "Current Electricity, Electromagnetic Induction, and Magnetism",
  },
  {
    subject: "Chemistry",
    topics: "Chemical Bonding and  Atomic Structure.",
  },
  // {
  //   subject: "Geography",
  //   topics: "Chemical Bonding and  Atomic Structure.",
  // },
];

const Planner = () => {
  return (
    <div className="flex flex-col justify-start gap-6 h-full pt-16 md:pt-20 lg:pt-0">
      <Header
        title="Planner"
        titleClassName="text-xl md:text-3xl lg:text-page-title"
      />

      <DesktopUI todaysTopics={todaysTopics} />

      <TabletUI todaysTopics={todaysTopics} />
    </div>
  );
};

export default Planner;
