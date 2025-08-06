"use client";
import { Header, NotificationIcon } from "@/components";

import TodaysPlan from "./TodaysPlan";
import ContinuousRevision from "./ContinuousRevision";
import SubjectProgress from "./SubjectProgress";
import DailyReport from "./DailyReport";
import ProgressAnalytics from "./ProgressAnalytics";
import ProfileBox from "./ProfileBox";
import PointsBox from "./PointsBox";
import TodaysVibe from "./TodaysVibe";
import DailyStreakQuestions from "./DailyStreakQuestions";
import UpcomingWorkshops from "./UpcomingWorkshops";
import { useAppSelector } from "@/redux/hooks";
import UpgradeSubscriptionButton from "./UpgradeSubscriptionButton";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";
import { TDayProps } from "@/helpers/types";
import InitialTodoBox from "./InitailTodoBox";

const DesktopUI = ({ quizTopics}: { quizTopics: TDayProps }) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="relative h-full flex flex-col justify-start gap-3 xl:gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Header title="Dashboard" />
        </div>
        <div className="hidden lg:w-60 xl:w-[268px] lg:flex justify-end mr-2">
          {/* <Header
            title="Profile"
            titleClassName="text-[32px]"
            icon={<NotificationIcon stroke="black" />}
          /> */}
          <UpgradeSubscriptionButton />
        </div>
      </div>

      <div className="flex-1 flex items-start gap-4 lg:overflow-y-auto custom__scrollbar pr-2">
        <section className="h-full flex flex-col justify-start gap-4 py-2 xl:w-[calc(100%-268px)]">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="relative border rounded-xl flex flex-col justify-start overflow-hidden h-[233px]">
              <Suspense fallback={<Loader />}>
                {user && user.planner === false ? <InitialTodoBox /> : <TodaysPlan quizData={quizTopics} />}
              </Suspense>
            </div>

            <div className="border rounded-xl">
              <ContinuousRevision />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="border rounded-xl ">
              <SubjectProgress />
            </div>

            <div className="border rounded-xl">
              <DailyReport />
            </div>
          </div>

          <div className="border rounded-xl">
            <ProgressAnalytics />
          </div>
        </section>

        <div className="hidden lg:w-60 xl:w-[268px] lg:block">
          <section className="flex flex-col justify-start gap-4 py-2">
            <ProfileBox />

            <PointsBox />

            <TodaysVibe />

            <DailyStreakQuestions />

            <UpcomingWorkshops />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DesktopUI;
