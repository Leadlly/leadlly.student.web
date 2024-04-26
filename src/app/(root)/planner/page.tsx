"use client";

import { Header } from "@/components";

import ProgressBars from "./_components/ProgressBars";
import TodaysPlan from "./_components/TodaysPlan";
import WeeklyPlan from "./_components/WeeklyPlan";

const todaysTopics = [
  {
    subject: "Mathematics",
    topics: "Limits,continuity, and differentiability.",
  },
  {
    subject: "Physics",
    topics: "Current Electricity, Electromagnetic Induction, and Magnetism",
  },
  {
    subject: "Chemistry",
    topics: "Chemical Bonding and  Atomic Structure.",
  },
];

const Planner = () => {
  return (
    <div className="flex flex-col justify-start gap-6 h-full">
      <Header title="Planner" />

      <section className="flex-1 grid grid-cols-2 gap-6 auto-rows-fr overflow-y-auto custom__scrollbar">
        <div className="rounded-xl border flex flex-col justify-start overflow-hidden">
          <TodaysPlan todaysTopics={todaysTopics} />
        </div>

        <div className="rounded-xl row-span-2 py-4 border">
          <WeeklyPlan />
        </div>
        <div className="border rounded-xl overflow-x-hidden overflow-y-auto custom__scrollbar">
          <ProgressBars />
        </div>
      </section>
    </div>
  );
};

export default Planner;
