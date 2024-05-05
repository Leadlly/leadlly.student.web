import { Header } from "@/components";
import { TDashboardTodaysTopic } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";
import ConnectWithMentor from "./ConnectWithMentor";
import SubjectProgress from "./SubjectProgress";
import ProfileBox from "./ProfileBox";
import PointsBox from "./PointsBox";
import DailyStreakQuestions from "./DailyStreakQuestions";
import TodaysVibe from "./TodaysVibe";
import UpcomingWorkshops from "./UpcomingWorkshops";
import DailyReport from "./DailyReport";
import ProgressAnalytics from "./ProgressAnalytics";

const TabletUI = ({
  todaysTopics,
}: {
  todaysTopics: TDashboardTodaysTopic[];
}) => {
  return (
    <div className="h-full flex flex-col justify-start gap-4">
      <Header title="Dashboard" titleClassName="text-[36px]" />

      <div className="flex-1 flex flex-col justify-start gap-4 lg:px-2 lg:overflow-y-auto custom__scrollbar">
        <div className="flex gap-4">
          <div className="space-y-4 w-1/2">
            <div className="border rounded-xl flex flex-col justify-start gap-3 overflow-hidden h-[330px]">
              <TodaysPlan todaysTopics={todaysTopics} />
            </div>
            <div className="border rounded-xl h-[240px]">
              <ConnectWithMentor />
            </div>
            <div className="border rounded-xl h-[270px] ">
              <SubjectProgress />
            </div>
          </div>

          <div className="w-1/2 space-y-4">
            <ProfileBox />

            <TodaysVibe />

            <PointsBox />

            <DailyStreakQuestions />

            <UpcomingWorkshops />

            <div className="border rounded-xl">
              <DailyReport />
            </div>
          </div>
        </div>

        <div className="border rounded-xl mb-4">
          <ProgressAnalytics />
        </div>
      </div>
    </div>
  );
};

export default TabletUI;
