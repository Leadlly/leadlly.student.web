import { Header } from "@/components";
import { TDashboardTodaysTopic } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";
import ConnectWithMentor from "./ConnectWithMentor";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import UserProfileSheet from "./UserProfileSheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/shared/LogoutButton";

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
          <Link href="/subscription-plans">
            <Button className="h-7 text-xs">Upgrade</Button>
          </Link>
          <UserProfileSheet />
          <LogoutButton />
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
