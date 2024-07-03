import { Header } from "@/components";
import MathsTracker from "./_components/MathsTracker";
import PhysicsTracker from "./_components/PhysicsTracker";
import ChemistryTracker from "./_components/ChemistryTracker";
import TrackerTabs from "./_components/TrackerTabs";

const Tracker = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activeSubject = searchParams["subject"] ?? "maths";

  return (
    <div className="h-full flex flex-col gap-y-4">
      <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <TrackerTabs activeSubject={activeSubject} />

      <hr className="border" />

      <div className="h-full overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {activeSubject === "maths" && <MathsTracker />}

        {activeSubject === "physics" && <PhysicsTracker />}

        {activeSubject === "chemistry" && <ChemistryTracker />}
      </div>
    </div>
  );
};

export default Tracker;
