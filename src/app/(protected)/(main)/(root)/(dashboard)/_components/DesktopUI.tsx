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
import { DailyPlan } from "@/lib/planner/types";
import InitialTodoBox from "./InitailTodoBox";
import Institute from "./institute";

const DesktopUI = ({ plan }: { plan?: DailyPlan | null }) => {
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
            href="/profile"
            className="flex h-10 items-center rounded-full bg-[#F5F3FF] px-4 text-sm font-semibold text-primary"
          >
            Profile
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-start gap-4 lg:overflow-y-auto custom__scrollbar pr-2">
        <section className="h-full flex w-full flex-col justify-start gap-4 py-2">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="relative flex min-w-80 max-h-[550px] flex-col justify-start overflow-hidden rounded-[28px] border border-[#EFEAF8] bg-white p-4">
              <Suspense fallback={<Loader />}>
                {user && user.planner === false ? (
                  <InitialTodoBox />
                ) : (
                  <TodaysPlan plan={plan} />
                )}
              </Suspense>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
                <ContinuousRevision />
              </div>
              <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
                <SubjectProgress />
              </div>
              <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
                <DailyReport />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
            <ProgressAnalytics />
          </div>
          {institute && institute._id ? (
            <div className="rounded-[28px] border border-[#EFEAF8] bg-white p-4">
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
