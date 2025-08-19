"use client";
import { Header } from "@/components";
import TodaysPlan from "./TodaysPlan";
import ContinuousRevision from "./ContinuousRevision";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import UserProfileSheet from "./UserProfileSheet";
import UpgradeSubscriptionButton from "./UpgradeSubscriptionButton";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";
import { TDayProps } from "@/helpers/types";
import InitialTodoBox from "./InitailTodoBox";
import { useAppSelector } from "@/redux/hooks";

const MobileUI = ({ quizTopics }: { quizTopics: TDayProps }) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="flex flex-col justify-start gap-3">
      <div className="flex items-center justify-between">
        <Header title="Dashboard" titleClassName="text-2xl" />
        <div className="flex items-center gap-2">
          <UpgradeSubscriptionButton />
          <UserProfileSheet />
        </div>
      </div>

      <div className="flex flex-col justify-start gap-3 overflow-hidden max-h-full">
        <Suspense fallback={<Loader />}>
          {/* <TodaysPlan quizData={quizTopics} /> */}
          {user && user.planner === false ? (
            <InitialTodoBox />
          ) : (
            <TodaysPlan quizData={quizTopics} />
          )}
        </Suspense>
      </div>

      <div className="border rounded-xl px-3 py-2">
        <ContinuousRevision />
      </div>

      <div className="border rounded-xl">
        <DailyReport />
      </div>

      <div className="border rounded-xl ">
        <SubjectProgress />
      </div>

      <div className="border rounded-xl mb-20">
        <ProgressAnalytics />
      </div>
    </div>
  );
};

export default MobileUI;
