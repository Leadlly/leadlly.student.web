"use client";

import { TabNavItem } from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import UnattemptedChapterWiseQuizzes from "./UnattemptedChapterWiseQuiz";
import UnattemptedWeeklyQuizzes from "./UnattemptedWeeklyQuizzes";
import CustomizedQuiz from "./CustomizedQuiz";
import {
  UnattemptedChapterQuizProps,
  UnattemptedWeeklyQuiz,
} from "@/helpers/types";

const unattemptTabs = [
  {
    id: "weeklyquiz",
    label: "Weekly Quiz",
    mobileOnly: false,
  },
  {
    id: "chapterquiz",
    label: "Chapter Quiz",
    mobileOnly: false,
  },
  { id: "customizedQuiz", label: "Custom Quiz", mobileOnly: true },
];

const Unattempted = () => {
  // Example data for upcoming quizzes
  const [weeklyQuizzes, setWeeklyQuizzes] = useState<UnattemptedWeeklyQuiz[]>([
    {
      id: 1,
      description: "Weekly Quiz 1: Vector Algebra, Matrices and Determinants",
      startDate: "2024-01-05",
      endDate: "2024-01-11",
      subjects: ["Maths", "Physics", "Chemistry"],
      questions: 30,
    },
    {
      id: 2,
      description: "Weekly Quiz 2: Electromagnetic Induction, Laws of Motion",
      startDate: "2024-12-21",
      endDate: "2024-12-27",
      subjects: ["Maths",  "Chemistry","Physics",],
      questions: 30,
    },
  ]);

  const [chapterQuizzes, setChapterQuizzes] = useState<
    UnattemptedChapterQuizProps[]
  >([
    {
      id: 1,
      chapterName: "Chemical Bonding",
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
      subject: "Chemistry",
      questions: 40,
    },
    {
      id: 2,
      chapterName: "Laws of Motion",
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
      subject: "Physics",
      questions: 40,
    },
    // Add more quizzes here
  ]);

  const [activeTab, setActiveTab] = useState("weeklyquiz");

  return (
    <div className="flex flex-col  mb-20 md:mb-0 max-w-full">
      {/* Upcoming meetings */}
      <div className="flex gap-3  justify-between	">
        <div className="py-3 border-2 rounded-xl flex-1 mb-5 h-full ">
          <ul className="flex justify-around">
            {unattemptTabs.map((tab) => (
              <TabNavItem
                key={tab.id}
                id={tab.id}
                title={tab.label}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                layoutIdPrefix="meetings"
                className={`text-xs  md:text-lg lg:text-xl text-black font-medium leading-none capitalize px-6 py-2.5 ${tab.mobileOnly ? "block lg:hidden" : ""}`}
                activeTabClassName="h-full inset-0 rounded-full bg-primary/25"
              />
            ))}
          </ul>

          <hr className="border-gray-300 my-3" />

          <div className="max-h-[700px] lg:max-h-[700px]  xl:max-h-[470px] h-full overflow-y-auto custom__scrollbar">
            {/* Upcoming Meetings Tab */}
            {activeTab == "weeklyquiz" && (
              <UnattemptedWeeklyQuizzes quizzes={weeklyQuizzes} />
            )}
            {activeTab == "chapterquiz" && (
              <UnattemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
            )}{" "}
            {activeTab == "customizedQuiz" && (
              <div className="flex justify-center lg:hidden">
                {" "}
                <CustomizedQuiz />
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <CustomizedQuiz />
        </div>
      </div>
    </div>
  );
};

export default Unattempted;
