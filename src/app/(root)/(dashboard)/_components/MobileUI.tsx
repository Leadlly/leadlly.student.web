import { Header, NotificationIcon } from "@/components";
import { TDashboardTodaysTopic } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";
import ConnectWithMentor from "./ConnectWithMentor";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import Image from "next/image";
import UserProfileSheet from "./UserProfileSheet";

const MobileUI = ({
  todaysTopics,
}: {
  todaysTopics: TDashboardTodaysTopic[];
}) => {
  return (
    <div className="flex flex-col justify-start gap-3">
      <div className="flex items-center justify-between">
        <Header title="Dashboard" titleClassName="text-2xl" />
        <div className="flex items-center gap-4">
          <NotificationIcon className="w-4 h-4" />
          <UserProfileSheet />
        </div>
      </div>

      <div className="border rounded-xl flex flex-col justify-start gap-3 overflow-hidden h-[233px]">
        <TodaysPlan todaysTopics={todaysTopics} />
      </div>

      <div className="border rounded-xl px-3 py-2">
        <ConnectWithMentor />
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
