"use client";

import { Suspense } from "react";
import DashboardGreeting from "./DashboardGreeting";
import TodaysPlan from "./TodaysPlan";
import ContinuousRevision from "./ContinuousRevision";
import SubjectProgress from "./SubjectProgress";
import DailyReport from "./DailyReport";
import ProgressAnalytics from "./ProgressAnalytics";
import PointsBox from "./PointsBox";
// import TodaysVibe from "./TodaysVibe";
// import DailyStreakQuestions from "./DailyStreakQuestions";
// import UpcomingWorkshops from "./UpcomingWorkshops";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/components/shared/Loader";
import { TDayProps } from "@/helpers/types";
import InitialTodoBox from "./InitailTodoBox";
import ReferAndEarn from "./referAndEarn";
import Institute from "./institute";
import CustomizePlanner from "./customizePlanner";

const DesktopUI = ({ quizTopics }: { quizTopics?: TDayProps }) => {
  const { user } = useAppSelector((state) => state.user);
  const { institute } = useAppSelector((state) => state.institute);

  return (
    <div className="relative h-full flex flex-col justify-start gap-3 xl:gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <DashboardGreeting />
        </div>
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

      <div className="flex flex-wrap gap-3">
        <div className="min-w-[220px] flex-1 rounded-3xl border border-[#F7F2FE]">
          <ContinuousRevision />
        </div>
        <div className="min-w-[220px] flex-1">
          <CustomizePlanner />
        </div>
        <div className="min-w-[220px] flex-1">
          <ReferAndEarn />
        </div>
      </div>

      <div className="flex-1 flex items-start gap-4 lg:overflow-y-auto custom__scrollbar pr-2">
        <section className="h-full flex w-full flex-col justify-start gap-4 py-2">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="max-h-[550px] min-w-80 relative flex flex-col justify-start overflow-hidden">
              <Suspense fallback={<Loader />}>
                {user && user.planner === false ? (
                  <InitialTodoBox />
                ) : (
                  <TodaysPlan quizData={quizTopics} />
                )}
              </Suspense>
            </div>

            <div className="w-full flex flex-col gap-4">
                <div className="rounded-3xl border border-[#F7F2FE]">
                <SubjectProgress />
              </div>

              <div className="border rounded-xl">
                <DailyReport />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#F7F2FE]">
            <ProgressAnalytics />
          </div>
          {institute && institute._id ? (
            <div className="rounded-3xl border border-[#F7F2FE] p-4">
              <h4 className="mb-2 text-lg font-semibold">Your Institute</h4>
              <Institute />
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default DesktopUI;
