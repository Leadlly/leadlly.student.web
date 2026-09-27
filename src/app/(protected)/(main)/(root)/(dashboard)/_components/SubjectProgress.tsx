"use client";

import { useEffect, useState } from "react";
import { SemiRadialChart, TabContent, TabNavItem } from "@/components";
import { getUserTracker } from "@/actions/tracker_actions";
import { useAppSelector } from "@/redux/hooks";

const SubjectProgress = () => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic?.subjects
  );
  const [activeTab, setActiveTab] = useState(userSubjects?.[0]?.name ?? "");
  const [stats, setStats] = useState({ revision: 0, efficiency: 0 });

  const subject = userSubjects?.find((item) => item.name === activeTab);

  useEffect(() => {
    if (!activeTab) return;
    let cancelled = false;
    getUserTracker(activeTab)
      .then((data) => {
        if (cancelled) return;
        const revision = Number(
          data?.subjectStats?.overall_progress ?? subject?.overall_progress ?? 0
        );
        const efficiency = Number(
          data?.subjectStats?.overall_efficiency ?? subject?.overall_efficiency ?? 0
        );
        setStats({
          revision: Number.isFinite(revision) ? revision : 0,
          efficiency: Number.isFinite(efficiency) ? efficiency : 0,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setStats({
          revision: Number(subject?.overall_progress ?? 0) || 0,
          efficiency: Number(subject?.overall_efficiency ?? 0) || 0,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, subject?.overall_efficiency, subject?.overall_progress]);

  return (
    <div className="h-full py-2">
      <div className="flex items-center justify-between gap-2 px-3">
        <h4 className="text-xs font-bold md:text-sm">Subject Progress</h4>
        <ul className="flex items-center gap-1 overflow-x-auto rounded-full border p-1">
          {userSubjects?.map((tab) => (
            <TabNavItem
              key={tab.name}
              title={tab.name}
              id={tab.name}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="subject_progress"
              activeTabClassName="inset-0 h-full rounded-full"
              titleClassName="capitalize"
            />
          ))}
        </ul>
      </div>
      <div className="h-full w-full overflow-hidden">
        <TabContent id={activeTab} activeTab={activeTab}>
          <div className="mt-3 grid h-full grid-cols-2 place-items-center">
            <SemiRadialChart
              series={[stats.revision]}
              colors={["#8B5CF6"]}
              chartLabel="revision"
            />
            <SemiRadialChart
              series={[stats.efficiency]}
              colors={["#56CFE1"]}
              chartLabel="efficiency"
            />
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default SubjectProgress;
