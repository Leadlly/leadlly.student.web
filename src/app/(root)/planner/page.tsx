import { Header } from "@/components";

import DesktopUI from "./_components/DesktopUI";
import TabletUI from "./_components/TabletUI";
import MobileUI from "./_components/MobileUI";

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
  {
    subject: "Geography",
    topics: "Chemical Bonding and  Atomic Structure.",
  },
];

const Planner = () => {
  return (
    <div className="flex flex-col justify-start gap-4 h-full">
      <Header
        title="Planner"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <DesktopUI todaysTopics={todaysTopics} />

      <TabletUI todaysTopics={todaysTopics} />

      <MobileUI todaysTopics={todaysTopics} />
    </div>
  );
};

export default Planner;
