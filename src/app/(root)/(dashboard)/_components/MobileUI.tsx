import { Header } from "@/components";
import TodaysPlan from "./TodaysPlan";
import ConnectWithMentor from "./ConnectWithMentor";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import UserProfileSheet from "./UserProfileSheet";
import LogoutButton from "@/components/shared/LogoutButton";
import UpgradeSubscriptionButton from "./UpgradeSubscriptionButton";

const MobileUI = () => {
  return (
    <div className="flex flex-col justify-start gap-3">
      <div className="flex items-center justify-between">
        <Header title="Dashboard" titleClassName="text-2xl" />
        <div className="flex items-center gap-2">
          <UpgradeSubscriptionButton />
          <UserProfileSheet />
          <LogoutButton />
        </div>
      </div>

      <div className="border rounded-xl flex flex-col justify-start gap-3 overflow-hidden h-[233px]">
        <TodaysPlan />
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
