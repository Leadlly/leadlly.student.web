"use client";

import { TabNavItem } from "@/components";
import React, { useState } from "react";
import UnattemptedChapterWiseQuizzes from "./UnattemptedChapterWiseQuiz";
import UnattemptedWeeklyQuizzes from "./UnattemptedWeeklyQuizzes";
import CustomizedQuiz from "./CustomizedQuiz";
import { UnattemptedChapterQuizProps, WeeklyQuizProps } from "@/helpers/types";

const unattemptedTabs = [
  {
    id: "weeklyQuiz",
    label: "Weekly Quiz",
    mobileOnly: false,
  },
  {
    id: "chapterQuiz",
    label: "Chapter Quiz",
    mobileOnly: false,
  },
  { id: "customizedQuiz", label: "Custom Quiz", mobileOnly: true },
];

const Unattempted = ({
  weeklyQuizzes,
}: {
  weeklyQuizzes: WeeklyQuizProps[];
}) => {
  const [chapterQuizzes, setChapterQuizzes] = useState<
    UnattemptedChapterQuizProps[]
  >([
    // {
    //   id: 1,
    //   chapterName: "Chemical Bonding",
    //   description:
    //     "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
    //   subject: "Chemistry",
    //   questions: 40,
    // },
    // {
    //   id: 2,
    //   chapterName: "Laws of Motion",
    //   description:
    //     "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
    //   subject: "Physics",
    //   questions: 40,
    // },
    // Add more quizzes here
  ]);

  const [activeTab, setActiveTab] = useState("weeklyQuiz");

  return (
    <div className="flex flex-col  mb-20 md:mb-0 max-w-full">
      {/* Upcoming meetings */}
      <div className="flex gap-3  justify-between	">
        <div className="py-3 border-2 rounded-xl flex-1 mb-5 h-full ">
          <ul className="flex justify-around">
            {unattemptedTabs.map((tab) => (
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
            {activeTab == "weeklyQuiz" && (
              <UnattemptedWeeklyQuizzes quizzes={weeklyQuizzes} />
            )}
            {activeTab == "chapterQuiz" && (
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
