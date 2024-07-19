"use client";

import { TabNavItem } from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import AttemptedWeeklyQuizzes from "./AttemptedWeeklyQuizzes";
import AttemptedChapterWiseQuizzes from "./AttemptedChapterWiseQuiz";
import AttemptedCustomizedQuizzes from "./AttemptedCustomizedquizzes";
import { AttemptedQuizProps, AttemptedWeeklyQuiz } from "@/helpers/types";

const AttemptTabs = [
  {
    id: "weeklyquiz",
    label: "Weekly Quiz",
  },
  {
    id: "chapterquiz",
    label: "Chapter Quiz",
  },
  {
    id: "customizedquiz",
    label: "Custom Quiz",
  },
];

const Attempted = () => {
  // Example data for upcoming quizzes
  const [weeklyQuizzes, setWeeklyQuizzes] = useState<AttemptedWeeklyQuiz[]>([
    // {
    //   id: 1,
    //   description: "Weekly Quiz 1: Vector Algebra, Matrices and Determinants",
    //   startDate: "2024-01-05",
    //   endDate: "2024-01-11",
    //   subject: "Chemistry",
    //   questions: 30,
    //   completedDate: "19 June 2024, at 10:30am",
    //   efficiency: 80,
    // },
    // {
    //   id: 2,
    //   description: "Weekly Quiz 2: Electromagnetic Induction, Laws of Motion",
    //   startDate: "2024-12-21",
    //   endDate: "2024-12-27",
    //   subject: "Maths",
    //   questions: 30,
    //   completedDate: "19 June 2024, at 10:30am",
    //   efficiency: 80,
    // },
  ]);

  const [chapterQuizzes, setChapterQuizzes] = useState<AttemptedQuizProps[]>([
    // {
    //   id: 1,
    //   chapterName: "Vector Algebra",
    //   description:
    //     "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
    //   subject: "Maths",
    //   questions: 30,
    //   completedDate: "19 June 2024, at 10:30am",
    //   efficiency: 80,
    // },
  ]);

  const [activeTab, setActiveTab] = useState("weeklyquiz");

  return (
    <div className="flex flex-col lg:flex-row mb-20 md:mb-0">
      {/* Upcoming meetings */}
      <div className="py-3 border-2 rounded-xl flex-1 mb-5 h-full ">
        <ul className="flex justify-around">
          {AttemptTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              title={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="meetings"
              className="text-xs md:text-lg lg:text-xl text-black font-medium leading-none capitalize px-6 py-2.5"
              activeTabClassName="h-full inset-0 rounded-full bg-primary/25"
            />
          ))}
        </ul>

        <hr className="border-gray-300 my-3" />

        <div className="max-h-[470px] lg:max-h-[700px]  flex flex-col xl:max-h-[470px] h-full overflow-y-auto custom__scrollbar">
          {/* Upcoming Meetings Tab */}
          {activeTab == "weeklyquiz" && (
            <AttemptedWeeklyQuizzes quizzes={weeklyQuizzes} />
          )}
          {activeTab == "chapterquiz" && (
            <AttemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
          )}
          {activeTab == "customizedquiz" && (
            <AttemptedCustomizedQuizzes quizzes={chapterQuizzes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Attempted;
