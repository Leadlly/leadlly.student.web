import { Header, NotificationIcon } from "@/components";

import TodaysPlan from "./TodaysPlan";
import ConnectWithMentor from "./ConnectWithMentor";
import SubjectProgress from "./SubjectProgress";
import DailyReport from "./DailyReport";
import ProgressAnalytics from "./ProgressAnalytics";
import ProfileBox from "./ProfileBox";
import PointsBox from "./PointsBox";
import TodaysVibe from "./TodaysVibe";
import DailyStreakQuestions from "./DailyStreakQuestions";
import UpcomingWorkshops from "./UpcomingWorkshops";

import { TDashboardTodaysTopic } from "@/helpers/types";

const DesktopUI = ({
  todaysTopics,
}: {
  todaysTopics: TDashboardTodaysTopic[];
}) => {
  return (
    <div className="h-full flex items-start gap-4">
      <div className="flex-1 flex flex-col justify-start gap-3 xl:gap-6 h-full">
        <Header title="Dashboard" />
        <section className="grid grid-cols-2 gap-4 py-2 lg:overflow-y-auto custom__scrollbar">
          <div className="border rounded-xl flex flex-col justify-start overflow-hidden h-[233px]">
            <TodaysPlan todaysTopics={todaysTopics} />
          </div>
          <div className="border rounded-xl">
            <ConnectWithMentor />
          </div>
          <div className="border rounded-xl ">
            <SubjectProgress />
          </div>
          <div className="border rounded-xl">
            <DailyReport />
          </div>
          <div className="border rounded-xl col-span-2">
            <ProgressAnalytics />
          </div>
        </section>
      </div>

      <div className="hidden lg:w-60 xl:w-[268px] lg:flex flex-col justify-start gap-3 xl:gap-6 h-full">
        <Header
          title="Profile"
          titleClassName="text-[32px]"
          icon={<NotificationIcon stroke="black" />}
        />

        <section className="flex flex-col justify-start gap-4 py-2 overflow-y-auto custom__scrollbar">
          <ProfileBox />

          <PointsBox />

          <TodaysVibe />

          <DailyStreakQuestions />

          <UpcomingWorkshops />
        </section>
      </div>
    </div>
  );
};

export default DesktopUI;
