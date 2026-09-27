"use client";

import { useEffect, useState } from "react";
import { TabNavItem } from "@/components";
import { getUserTracker } from "@/actions/tracker_actions";
import { subjectsForExam } from "@/lib/subjects";
import { useAppSelector } from "@/redux/hooks";

const Ring = ({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}) => {
  const percent = Math.min(100, Math.max(0, value));
  return (
    <div className="flex flex-col items-center">
      <div
        className="grid h-28 w-28 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${percent * 3.6}deg, #EFEAF8 0deg)`,
        }}
      >
        <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-white text-lg font-semibold text-dark-primary">
          {Math.round(percent)}%
        </div>
      </div>
      <p className="mt-3 text-sm text-secondary-text">{label}</p>
    </div>
  );
};

const SubjectProgress = () => {
  const user = useAppSelector((state) => state.user.user);
  const userSubjects = subjectsForExam(
    user?.academic?.subjects,
    user?.academic?.competitiveExam
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
    <div className="h-full px-5 py-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-lg font-semibold text-dark-primary">Subject progress</h4>
        <ul className="flex items-center gap-1 overflow-x-auto rounded-full bg-[#F4F1FB] p-1">
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
      <div className="mt-6 grid grid-cols-2 place-items-center">
        <Ring value={stats.revision} color="#8B5CF6" label="Revisions" />
        <Ring value={stats.efficiency} color="#56CFE1" label="Revision accuracy" />
      </div>
    </div>
  );
};

export default SubjectProgress;
