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
      <ul className="flex gap-2 p-4">
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

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 custom__scrollbar">
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
