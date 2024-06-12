import { Header } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MathsTracker from "./_components/MathsTracker";
import PhysicsTracker from "./_components/PhysicsTracker";
import ChemistryTracker from "./_components/ChemistryTracker";
import { trackerTabs } from "@/helpers/constants";

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

      <ul className="flex items-center justify-between md:justify-start gap-5 md:gap-10 md:mt-8">
        {trackerTabs.map((tab) => (
          <Link key={tab.id} href={`/tracker?subject=${tab.subject}`}>
            <li
              className={cn(
                "capitalize border-2 px-5 md:px-7 py-2 rounded-lg md:rounded-xl text-base md:text-2xl leading-none font-semibold transition ease-in-out duration-300",
                activeSubject === tab.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-transparent border-[#878787] text-[#878787]"
              )}>
              {tab.subject}
            </li>
          </Link>
        ))}
      </ul>

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
