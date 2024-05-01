import { Header, NotificationIcon } from "@/components";
import ConnectWithMentor from "./_components/ConnectWithMentor";
import DailyReport from "./_components/DailyReport";
import ProgressAnalytics from "./_components/ProgressAnalytics";
import SubjectProgress from "./_components/SubjectProgress";
import TodaysPlan from "./_components/TodaysPlan";
import LevelPoints from "./_components/LevelPoints";
import ProfileBox from "./_components/ProfileBox";
import PointsBox from "./_components/PointsBox";
import TodaysVibe from "./_components/TodaysVibe";
import DailyStreakQuestions from "./_components/DailyStreakQuestions";
import UpcomingWorkshops from "./_components/UpcomingWorkshops";

const todaysTopics = [
  {
    label: "limit",
    completed: true,
  },
  {
    label: "continuity",
    completed: false,
  },
  {
    label: "differentiability",
    completed: false,
  },
  {
    label: "electromagnetic induction",
    completed: false,
  },
  {
    label: "chemical bonding",
    completed: false,
  },
];

const Dashboard = () => {
  return (
    <div className="h-full flex items-start gap-4">
      <div className="flex-1 flex flex-col justify-start gap-3 xl:gap-6 h-full">
        <Header title="Dashboard" />
        <section className="grid grid-cols-2 gap-4 pr-2 py-2 overflow-y-auto custom__scrollbar">
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
          titleSize="text-[32px]"
          icon={<NotificationIcon stroke="black" />}
        />

        <section className="flex flex-col justify-start gap-4 pr-2 py-2 overflow-y-auto custom__scrollbar">
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

export default Dashboard;
