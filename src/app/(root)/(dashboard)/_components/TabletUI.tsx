import { Header } from "@/components";
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
import UpgradeSubscriptionButton from "./UpgradeSubscriptionButton";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";
import { TDayProps } from "@/helpers/types";

const TabletUI = ({ quizTopics }: { quizTopics: TDayProps }) => {
  return (
    <div className="h-full flex flex-col justify-start gap-4">
      <div className="flex justify-between">
        <Header title="Dashboard" titleClassName="text-[36px]" />

        <UpgradeSubscriptionButton />
      </div>

      <div className="flex-1 flex flex-col justify-start gap-4 md:overflow-y-auto custom__scrollbar pr-3">
        <div className="flex gap-4">
          <div className="space-y-4 w-1/2">
            <div className="border rounded-xl flex flex-col justify-start gap-3 overflow-hidden h-[330px]">
              <Suspense fallback={<Loader />}>
                <TodaysPlan quizData={quizTopics} />
              </Suspense>
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

            <PointsBox />

            <TodaysVibe />

            <DailyStreakQuestions />

            <UpcomingWorkshops />

            <div className="border rounded-xl">
              <DailyReport />
            </div>
          </div>
        </div>

        <div className="border rounded-xl">
          <ProgressAnalytics />
        </div>
      </div>
    </div>
  );
};

export default TabletUI;
