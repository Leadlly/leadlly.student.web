"use client";

import { useState } from "react";
import { SemiRadialChart, TabContent, TabNavItem } from "@/components";

const subjectProgressMenus = [
  {
    title: "Maths",
    id: "maths",
  },
  {
    title: "Physics",
    id: "physics",
  },
  {
    title: "Chemistry",
    id: "chemistry",
  },
];

const SubjectProgress = () => {
  const [activeTab, setActiveTab] = useState("maths");
  return (
    <div className="py-2">
      <div className="px-3 flex items-center justify-between">
        <h4 className="text-sm font-bold">Subject Progress</h4>
        <ul className="flex items-center gap-1 border p-[2px] rounded-md">
          {subjectProgressMenus.map((tab) => (
            <TabNavItem
              key={tab.id}
              title={tab.title}
              id={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>
      <div className="w-full h-full overflow-hidden">
        <TabContent id="maths" activeTab={activeTab}>
          <div className="grid grid-cols-2 mt-3">
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
