import { TPlannerTodaysTopic } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";

const TabletUI = ({
  todaysTopics,
}: {
  todaysTopics: TPlannerTodaysTopic[];
}) => {
  return (
    <div className="xl:hidden">
      <div className="border rounded-xl">
        <TodaysPlan todaysTopics={todaysTopics} />
      </div>
    </div>
  );
};

export default TabletUI;
