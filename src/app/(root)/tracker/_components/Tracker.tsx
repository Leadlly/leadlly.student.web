import { TTrackerProps } from "@/helpers/types";
import ChapterOverviewTable from "./ChapterOverviewTable";
import SubjectOverview from "./SubjectOverview";

const TrackerComponent = ({
  trackerData,
}: {
  trackerData: TTrackerProps[];
}) => {
  console.log(trackerData);

  return (
    <div className="flex flex-col gap-y-6">
      <SubjectOverview />

      {trackerData && trackerData.length ? (
        trackerData.map((item) => (
          <ChapterOverviewTable key={item._id} chapterData={item} />
        ))
      ) : (
        <div className="w-full text-center text-lg text-muted-foreground font-semibold">
          No Chapter to track!
        </div>
      )}
    </div>
  );
};

export default TrackerComponent;
