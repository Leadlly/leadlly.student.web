"use client";
import DashboardGreeting from "./DashboardGreeting";
import TodaysPlan from "./TodaysPlan";
import ContinuousRevision from "./ContinuousRevision";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";
import { DailyPlan } from "@/lib/planner/types";
import InitialTodoBox from "./InitailTodoBox";
import { useAppSelector } from "@/redux/hooks";
import Institute from "./institute";

const MobileUI = ({ plan }: { plan?: DailyPlan | null }) => {
  const user = useAppSelector((state) => state.user.user);
  const { institute } = useAppSelector((state) => state.institute);

  return (
    <div className="flex flex-col justify-start gap-3 pb-6">
      <div className="flex items-center justify-between">
        <DashboardGreeting />
        <Link
          href="/profile"
          className="flex h-10 items-center rounded-full bg-[#F5F3FF] px-4 text-sm font-semibold text-primary"
        >
          Profile
        </Link>
      </div>

      <div className="flex flex-col justify-start gap-3">
        <Suspense fallback={<Loader />}>
          {/* <TodaysPlan quizData={quizTopics} /> */}
          {user && user.planner === false ? (
            <InitialTodoBox />
          ) : (
            <TodaysPlan plan={plan} />
          )}
        </Suspense>
      </div>

      <div className="rounded-[28px] border border-[#EFEAF8] bg-white px-3 py-2">
        <ContinuousRevision />
      </div>

      {institute && institute._id && (
        <div className="w-full">
          <div>
            <h4 className="text-lg font-semibold mb-1">Your Institute</h4>
          </div>
          <Institute />
        </div>
      )}

      <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
        <DailyReport />
      </div>

      <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
        <ProgressAnalytics />
      </div>

      <div className="rounded-[28px] border border-[#EFEAF8] bg-white">
        <SubjectProgress />
      </div>
    </div>
  );
};

export default MobileUI;
