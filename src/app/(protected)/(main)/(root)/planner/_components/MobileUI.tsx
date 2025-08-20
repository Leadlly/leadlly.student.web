import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PlannerDataProps, TDayProps } from "@/helpers/types";
import TodaysPlan from "./TodaysPlan";
import RevisionZone from "./RevisionZone";
import WeeklyPlan from "./WeeklyPlan";

const MobileUI = ({
  todaysTopics,
  plannerData,
  setData,
}: {
  todaysTopics: TDayProps | null;
  plannerData: PlannerDataProps;
  setData: (data: TDayProps | null) => void;
}) => {
  return (
    <section className="md:hidden w-full">
      <Tabs defaultValue="todays_plan" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="todays_plan" className="w-full">
            Today&apos;s Plan
          </TabsTrigger>
          <TabsTrigger value="weekly_plan" className="w-full">
            Weekly Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todays_plan">
          <div className="flex flex-col justify-start gap-4 mb-20">
            <TodaysPlan todaysTopics={todaysTopics} />

            <RevisionZone />
          </div>
        </TabsContent>

        <TabsContent value="weekly_plan" className="h-[600px] mb-20">
          <WeeklyPlan data={plannerData} setData={setData} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MobileUI;
