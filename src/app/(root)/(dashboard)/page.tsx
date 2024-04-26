import { Header, NotificationIcon } from "@/components";
import ConnectWithMentor from "./_components/ConnectWithMentor";
import DailyReport from "./_components/DailyReport";
import ProgressAnalytics from "./_components/ProgressAnalytics";
import SubjectProgress from "./_components/SubjectProgress";
import TodaysPlan from "./_components/TodaysPlan";

const todaysTopics = [
  {
    label: "limit",
    completed: true,
  },
  {
    label: "continuity",
    completed: false,
  },
  {
    label: "differentiability",
    completed: false,
  },
  {
    label: "electromagnetic induction",
    completed: false,
  },
  {
    label: "chemical bonding",
    completed: false,
  },
];

const Dashboard = () => {
  return (
    <div className="h-full flex items-start gap-6">
      <div className="flex-1 flex flex-col justify-start gap-6 h-full">
        <Header title="Dashboard" />
        <section className="grid grid-cols-2 gap-6 pr-2 py-2 overflow-y-auto custom__scrollbar">
          <div className="border rounded-xl flex flex-col justify-start overflow-hidden h-[233px]">
            <TodaysPlan todaysTopics={todaysTopics} />
          </div>
          <div className="border rounded-xl">
            <ConnectWithMentor />
          </div>
          <div className="border rounded-xl ">
            <SubjectProgress />
          </div>
          <div className="border rounded-xl">
            <DailyReport />
          </div>
          <div className="border rounded-xl col-span-2">
            <ProgressAnalytics />
          </div>
        </section>
      </div>
      <div className="w-[268px]">
        <Header
          title="Profile"
          titleSize="text-[32px]"
          icon={<NotificationIcon stroke="black" />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
