import { Header } from "@/components";
import TrackerTabs from "./_components/TrackerTabs";
import TrackerComponent from "./_components/Tracker";
import { getUserTracker } from "@/actions/tracker_actions";

const Tracker = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activeSubject = searchParams["subject"] ?? "maths";

  const trackerData = await getUserTracker(activeSubject);

  console.log(activeSubject, "subjects")

  return (
    <div className="h-full flex flex-col gap-y-4">
      <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <TrackerTabs activeSubject={activeSubject} />

      <hr className="border" />

      <div className="h-full overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {activeSubject && (
          <TrackerComponent trackerData={trackerData.tracker} />
        )}
      </div>
    </div>
  );
};

export default Tracker;
