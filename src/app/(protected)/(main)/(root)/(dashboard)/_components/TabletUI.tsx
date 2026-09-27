"use client";
import DashboardGreeting from "./DashboardGreeting";
import TodaysPlan from "./TodaysPlan";
import ContinuousRevision from "./ContinuousRevision";
import SubjectProgress from "./SubjectProgress";
import PointsBox from "./PointsBox";
import DailyStreakQuestions from "./DailyStreakQuestions";
import TodaysVibe from "./TodaysVibe";
import UpcomingWorkshops from "./UpcomingWorkshops";
import DailyReport from "./DailyReport";
import ProgressAnalytics from "./ProgressAnalytics";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";
import { TDayProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";
import InitialTodoBox from "./InitailTodoBox";
import Institute from "./institute";
import ReferAndEarn from "./referAndEarn";
import CustomizePlanner from "./customizePlanner";

const TabletUI = ({ quizTopics }: { quizTopics?: TDayProps }) => {
  const user = useAppSelector((state) => state.user.user);
  const { institute } = useAppSelector((state) => state.institute);

  return (
    <div className="h-full flex flex-col justify-start gap-4">
      <div className="flex items-center justify-between gap-3">
        <DashboardGreeting />
        <div className="flex items-center gap-3">
          <PointsBox />
          <Link
            href="/manage-account"
            className="flex h-10 items-center rounded-full bg-[#F5F3FF] px-4 text-sm font-semibold text-primary"
          >
            Profile
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start gap-4 md:overflow-y-auto custom__scrollbar pr-3">
        <div className="flex gap-4">
          <div className="space-y-4 w-1/2">
            <div className="flex flex-col justify-start gap-3 overflow-hidden max-h-[500px]">
              <Suspense fallback={<Loader />}>
                {/* <TodaysPlan quizData={quizTopics} /> */}
                {user && user.planner === false ? (
                  <InitialTodoBox />
                ) : (
                  <TodaysPlan quizData={quizTopics} />
                )}
              </Suspense>
            </div>
            <div className="border rounded-xl h-20">
              <ContinuousRevision />
            </div>
            <div className="border rounded-xl h-[270px] ">
              <SubjectProgress />
            </div>
          </div>

          <div className="w-1/2 space-y-4">
            {/* <TodaysVibe />

            <DailyStreakQuestions />

            <UpcomingWorkshops /> */}

            <div className="border rounded-xl">
              <DailyReport />
            </div>

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
