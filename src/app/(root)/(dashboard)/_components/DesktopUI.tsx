"use client";

import { Suspense } from "react";
import { Header } from "@/components";
import TodaysPlan from "./TodaysPlan";
import ContinuousRevision from "./ContinuousRevision";
import SubjectProgress from "./SubjectProgress";
import DailyReport from "./DailyReport";
import ProgressAnalytics from "./ProgressAnalytics";
import ProfileBox from "./ProfileBox";
import PointsBox from "./PointsBox";
// import TodaysVibe from "./TodaysVibe";
// import DailyStreakQuestions from "./DailyStreakQuestions";
// import UpcomingWorkshops from "./UpcomingWorkshops";
import { useAppSelector } from "@/redux/hooks";
import UpgradeSubscriptionButton from "./UpgradeSubscriptionButton";
import Loader from "@/components/shared/Loader";
import { TDayProps } from "@/helpers/types";
import InitialTodoBox from "./InitailTodoBox";
import ReferAndEarn from "./referAndEarn";
import Institute from "./institute";
import CustomizePlanner from "./customizePlanner";

const DesktopUI = ({ quizTopics }: { quizTopics: TDayProps }) => {
  const { user } = useAppSelector((state) => state.user);
  const { institute } = useAppSelector((state) => state.institute);

  return (
    <div className="relative h-full flex flex-col justify-start gap-3 xl:gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Header title={`Good Morning, ${user?.firstname}`} />
        </div>
        <div className="hidden lg:w-60 xl:w-[268px] lg:flex justify-end mr-2">
          <UpgradeSubscriptionButton />
        </div>
      </div>

      <div className="flex-1 flex items-start gap-4 lg:overflow-y-auto custom__scrollbar pr-2">
        <section className="h-full flex flex-col justify-start gap-4 py-2 xl:w-[calc(100%-268px)]">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="max-h-full min-w-80 relative flex flex-col justify-start overflow-hidden">
              <Suspense fallback={<Loader />}>
                {user && user.planner === false ? (
                  <InitialTodoBox />
                ) : (
                  <TodaysPlan quizData={quizTopics} />
                )}
              </Suspense>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="border rounded-xl h-20 grid place-items-center">
                <ContinuousRevision />
              </div>
              <div className="border rounded-xl ">
                <SubjectProgress />
              </div>

              <div className="border rounded-xl">
                <DailyReport />
              </div>
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

            {institute && institute._id && (
              <div className="w-full">
                <div>
                  <h4 className="text-lg font-semibold mb-1">Your Institute</h4>
                </div>
                <Institute />
              </div>
            )}

            <CustomizePlanner />

            <ReferAndEarn />

            {/* <TodaysVibe />

            <DailyStreakQuestions />

            <UpcomingWorkshops /> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DesktopUI;
