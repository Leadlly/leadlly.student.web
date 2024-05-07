"use client";

import Link from "next/link";

import { RightArrowIcon } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";

import { getTodaysFormattedDate } from "@/helpers/utils";
import { TDashboardTodaysTopic } from "@/helpers/types";
import { useState } from "react";
import QuestionDialogBox from "./QuestionDialogBox";
import { quizQuestions } from "@/helpers/constants";

const TodaysPlan = ({
  todaysTopics,
}: {
  todaysTopics: TDashboardTodaysTopic[];
}) => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState("");

  const handleCheckboxClick = (topic: string) => {
    setTopic(topic);
    setOpenQuestionDialogBox(true);
  };

  return (
    <>
      <div className="flex items-center justify-between py-3 px-4 md:px-6">
        <div className="flex items-center gap-2 md:flex-col md:gap-1">
          <h4 className="text-base md:text-xl font-semibold">
            Today&apos;s Plan
          </h4>
          <p className="text-[10px] md:text-xs mt-[2px] md:mt-0 font-medium text-[#9E9C9C]">
            {getTodaysFormattedDate()}
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-4 text-[#A36AF5] text-sm md:text-base">
          View all
          <RightArrowIcon stroke="#A36AF5" />
        </Link>
      </div>

      <div className="w-full flex-1 px-4 md:px-6 overflow-y-auto custom__scrollbar">
        <ul className="w-full h-full flex flex-col justify-start gap-1 md:gap-4 xl:gap-0">
          {todaysTopics.map((topic, i) => (
            <div key={i} className="flex items-center justify-between">
              <li className="flex items-start gap-2 w-full py-1">
                <Checkbox
                  className="h-4 w-4 md:h-[18px] md:w-[18px] md:mt-[2px] border-[2px] border-[#787878] data-[state=checked]:bg-green-400 data-[state=checked]:text-white data-[state=checked]:border-none"
                  checked={topic.completed}
                  onClick={() => handleCheckboxClick(topic.label)}
                />
                <div className="capitalize text-sm md:text-base font-medium">
                  <p>{topic.label}</p>
                </div>
              </li>
              {topic.completed && (
                <div className="text-[10px] py-[2px] px-1 text-green-500 bg-green-400/10 rounded capitalize">
                  <p>completed</p>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>

      {openQuestionDialogBox && (
        <QuestionDialogBox
          openQuestionDialogBox={openQuestionDialogBox}
          setOpenQuestionDialogBox={setOpenQuestionDialogBox}
          questions={quizQuestions}
          topic={topic}
        />
      )}
    </>
  );
};

export default TodaysPlan;
