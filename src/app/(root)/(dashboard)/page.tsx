import { getPlanner } from "@/actions/planner_actions";
import DesktopUI from "./_components/DesktopUI";
import MobileUI from "./_components/MobileUI";
import TabletUI from "./_components/TabletUI";
import { DataProps } from "@/helpers/types";
import { getFormattedDate, getFormattedDateForProd } from "@/helpers/utils";

const Dashboard = async () => {
  const { data }: DataProps = await getPlanner();

  return (
    <>
      <div className="hidden xl:block h-full">
        <DesktopUI
          quizTopics={
            data?.days.filter((item) =>
              process.env.NODE_ENV === "development"
                ? getFormattedDate(new Date(item.date)) ===
                  getFormattedDate(new Date(Date.now()))
                : getFormattedDateForProd(new Date(item.date)) ===
                  getFormattedDateForProd(new Date(Date.now()))
            )[0]
          }
        />
      </div>

      <div className="h-full hidden md:block xl:hidden md:pb-4">
        <TabletUI
          quizTopics={
            data?.days.filter(
              (item) =>
                getFormattedDate(new Date(item.date)) ===
                getFormattedDate(new Date(Date.now()))
            )[0]
          }
        />
      </div>

      <div className="h-full md:hidden">
        <MobileUI
          quizTopics={
            data?.days.filter(
              (item) =>
                getFormattedDate(new Date(item.date)) ===
                getFormattedDate(new Date(Date.now()))
            )[0]
          }
        />
      </div>
    </>
  );
};

export default Dashboard;
