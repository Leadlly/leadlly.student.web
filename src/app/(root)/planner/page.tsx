import { Header } from "@/components";

import DesktopUI from "./_components/DesktopUI";
import TabletUI from "./_components/TabletUI";
import MobileUI from "./_components/MobileUI";
import { DataProps, PlannerDataProps } from "@/helpers/types";
import { getPlanner } from "@/actions/planner_actions";
import ClientWrapper from "./_components/ClientWrapper";

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
];

const Planner = async () => {
  const { data }: DataProps = await getPlanner();

  return (
    <div className="flex flex-col justify-start gap-4 h-full">
      <Header
        title="Planner"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ClientWrapper data={data} />
    </div>
  );
};

export default Planner;
