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
    <div className="flex flex-col md:h-full">
      <ul className="mx-4 mt-5 flex items-center rounded-full border border-[#E4DFF0] bg-white p-1">
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

      <div className="custom__scrollbar mt-5 px-4 pb-6 md:min-h-0 md:flex-1 md:overflow-y-auto">
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
