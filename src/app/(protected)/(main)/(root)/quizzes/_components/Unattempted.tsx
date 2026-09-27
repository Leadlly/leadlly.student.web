"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import UnattemptedChapterWiseQuizzes from "./UnattemptedChapterWiseQuiz";
import UnattemptedWeeklyQuizzes from "./UnattemptedWeeklyQuizzes";
import { UnattemptedChapterQuizProps, WeeklyQuizProps } from "@/helpers/types";

const unattemptedTabs = [
  { id: "weeklyQuiz", label: "Weekly Quiz" },
  { id: "chapterQuiz", label: "Chapter Quiz" },
];

const Unattempted = ({
  weeklyQuizzes,
  chapterQuizzes,
}: {
  weeklyQuizzes: WeeklyQuizProps[];
  chapterQuizzes: UnattemptedChapterQuizProps[];
}) => {
  const [activeTab, setActiveTab] = useState("weeklyQuiz");

  return (
    <div className="flex h-full flex-col">
      <ul className="mx-4 mt-5 flex items-center rounded-full border border-[#E4DFF0] bg-white p-1">
        {unattemptedTabs.map((tab) => (
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

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto px-4 pb-6 custom__scrollbar">
        {activeTab === "weeklyQuiz" && (
          <UnattemptedWeeklyQuizzes quizzes={weeklyQuizzes} />
        )}
        {activeTab === "chapterQuiz" && (
          <UnattemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
        )}
      </div>
    </div>
  );
};

export default Unattempted;
