"use client";

import { useState } from "react";
import { SemiRadialChart, TabContent, TabNavItem } from "@/components";
import { useAppSelector } from "@/redux/hooks";

const SubjectProgress = () => {
  const [activeTab, setActiveTab] = useState("maths");

  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  return (
    <div className="h-full py-2">
      <div className="px-3 flex items-center justify-between">
        <h4 className="text-xs md:text-sm font-bold">Subject Progress</h4>
        <ul className="flex items-center gap-1 border p-[2px] rounded-md">
          {userSubjects?.map((tab, i) => (
            <TabNavItem
              key={i}
              title={tab.name}
              id={tab.name}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="subject_progress"
              activeTabClassName="h-full inset-0"
              titleClassName="capitalize"
            />
          ))}
        </ul>
      </div>
      <div className="w-full h-full overflow-hidden">
        <TabContent id="maths" activeTab={activeTab}>
          <div className="h-full grid grid-cols-2 mt-3 place-items-center">
            <div className="h-full flex flex-col gap-2">
              <SemiRadialChart
                series={[70]}
                colors={["#6200EE"]}
                chartLabel="revision"
              />
            </div>

            <div className="h-full flex flex-col gap-2">
              <SemiRadialChart
                series={[30]}
                colors={["#56CFE1"]}
                chartLabel="efficiency"
              />
            </div>
          </div>
        </TabContent>

        <TabContent id="physics" activeTab={activeTab}>
          <div className="grid grid-cols-2 mt-3">
            <div className="h-full flex flex-col gap-2">
              <SemiRadialChart
                series={[55]}
                colors={["#6200EE"]}
                chartLabel="revision"
              />
            </div>

            <div className="h-full flex flex-col gap-2">
              <SemiRadialChart
                series={[60]}
                colors={["#56CFE1"]}
                chartLabel="efficiency"
              />
            </div>
          </div>
        </TabContent>

        <TabContent id="chemistry" activeTab={activeTab}>
          <div className="grid grid-cols-2 mt-3">
            <div className="h-full flex flex-col gap-2">
              <SemiRadialChart
                series={[90]}
                colors={["#6200EE"]}
                chartLabel="revision"
              />
            </div>

            <div className="h-full flex flex-col gap-2">
              <SemiRadialChart
                series={[25]}
                colors={["#56CFE1"]}
                chartLabel="efficiency"
              />
            </div>
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default SubjectProgress;
