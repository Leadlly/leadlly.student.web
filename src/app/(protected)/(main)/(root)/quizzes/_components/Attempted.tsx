"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AttemptedWeeklyQuizzes from "./AttemptedWeeklyQuizzes";
import AttemptedChapterWiseQuizzes from "./AttemptedChapterWiseQuiz";
import { AttemptedQuizProps, WeeklyQuizProps } from "@/helpers/types";

const attemptTabs = [
  { id: "weeklyquiz", label: "Weekly Quiz" },
  { id: "chapterquiz", label: "Chapter Quiz" },
];

const Attempted = ({
  weeklyQuizzes,
  chapterQuizzes,
}: {
  weeklyQuizzes: WeeklyQuizProps[];
  chapterQuizzes: AttemptedQuizProps[];
}) => {
  const [activeTab, setActiveTab] = useState("weeklyquiz");

  return (
    <div className="flex h-full flex-col">
      <ul className="mx-4 mt-4 flex items-center rounded-full border border-[#E4DFF0] bg-white p-1">
        {attemptTabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "h-10 w-full rounded-full text-sm font-semibold md:text-base",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-secondary-text"
              )}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 custom__scrollbar">
        {activeTab === "weeklyquiz" && (
          <AttemptedWeeklyQuizzes quizzes={weeklyQuizzes} />
        )}
        {activeTab === "chapterquiz" && (
          <AttemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
        )}
      </div>
    </div>
  );
};

export default Attempted;
