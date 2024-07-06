"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { RightArrowIcon } from "@/components";

import {
  getFormattedDate,
  getTodaysDay,
  getTodaysFormattedDate,
} from "@/helpers/utils";
import { DataProps, TDayProps } from "@/helpers/types";

import QuestionDialogBox from "./QuestionDialogBox";
import { getPlanner } from "@/actions/planner_actions";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useReadLocalStorage, useIsMounted } from "usehooks-ts";

const TodaysPlan = () => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState<{ name: string; _id: string } | null>(
    null
  );
  const [quizData, setQuizData] = useState<TDayProps | null>(null);

  const completedTopics: { expiryDate: number; value: string[] } | null =
    useReadLocalStorage("completed_topic");

  const incompleteTopics: { expiryDate: number; value: string[] } | null =
    useReadLocalStorage("incomplete_topic");

  const isMounted = useIsMounted();

  const handleCheckboxClick = (topic: string, topicId: string) => {
    setTopic({ name: topic, _id: topicId });
    setOpenQuestionDialogBox(true);
  };

  useEffect(() => {
    const getQuestionData = async () => {
      const { data }: DataProps = await getPlanner();

      setQuizData(
        data.days.filter(
          (item) =>
            getFormattedDate(new Date(item.date)) ===
            getFormattedDate(new Date(Date.now()))
        )[0] || null
      );
    };

    getQuestionData();
  }, []);

  useEffect(() => {
    if (
      isMounted() &&
      completedTopics &&
      new Date().getTime() >= completedTopics?.expiryDate!
    ) {
      localStorage.removeItem("completed_topic");
    }
    if (
      isMounted() &&
      incompleteTopics &&
      new Date().getTime() >= incompleteTopics?.expiryDate!
    ) {
      localStorage.removeItem("incomplete_topic");
    }
  }, [isMounted]);

  return (
    <>
      <div className="flex items-center justify-between py-3 px-4 md:px-6">
        <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-1">
          <h4 className="text-base md:text-xl font-semibold">
            Today&apos;s Plan
          </h4>
          <p className="text-[10px] md:text-xs mt-[2px] md:mt-0 font-medium text-[#9E9C9C]">
            {getTodaysDay()} {getTodaysFormattedDate()}
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-4 text-[#A36AF5] text-sm md:text-base"
        >
          View all
          <RightArrowIcon className="md:w-[9px] md:h-[9px] stroke-[#A36AF5]" />
        </Link>
      </div>

      <div className="w-full flex-1 px-4 md:px-6 overflow-y-auto custom__scrollbar">
        <ul className="w-full h-full flex flex-col justify-start gap-1 md:gap-4 xl:gap-0">
          {quizData?.backRevisionTopics.map((topic) => (
            <div
              key={topic._id}
              className={cn(
                "flex items-center justify-between",
                completedTopics &&
                  completedTopics.value.length > 0 &&
                  completedTopics.value.includes(topic._id!) &&
                  "pointer-events-none opacity-70"
              )}
            >
              <li
                className="flex items-start gap-2 w-full py-1 cursor-pointer"
                onClick={() => handleCheckboxClick(topic.topic.name, topic._id)}
              >
                <div
                  className={cn(
                    "h-4 w-4 md:h-[18px] md:w-[18px] text-white border-2 rounded border-[#787878] grid place-items-center",
                    completedTopics &&
                      completedTopics.value.length > 0 &&
                      completedTopics.value.includes(topic._id) &&
                      "bg-[#0FD679]/80 border-none",
                    incompleteTopics &&
                      incompleteTopics.value.length > 0 &&
                      incompleteTopics.value.includes(topic._id) &&
                      "bg-[#ff2e2e]/80 border-none"
                  )}
                >
                  {completedTopics &&
                    completedTopics.value.length > 0 &&
                    completedTopics.value.includes(topic._id) && (
                      <Check className="w-3 h-3" />
                    )}

                  {incompleteTopics &&
                    incompleteTopics.value.length > 0 &&
                    incompleteTopics.value.includes(topic._id) && (
                      <span className="leading-tight text-xs font-semibold">
                        !
                      </span>
                    )}
                </div>

                <div className="capitalize text-sm md:text-base font-medium">
                  <p>{topic.topic.name}</p>
                </div>
              </li>
              {completedTopics &&
                completedTopics.value.length > 0 &&
                completedTopics.value.includes(topic._id) && (
                  <div className="text-[10px] py-[2px] px-1 bg-[#0FD679]/80 text-white rounded capitalize">
                    <p>completed</p>
                  </div>
                )}
              {incompleteTopics &&
                incompleteTopics.value.length > 0 &&
                incompleteTopics.value.includes(topic._id) && (
                  <div className="text-[10px] py-[2px] px-1 bg-[#ff2e2e]/80 text-white rounded capitalize">
                    <p>incomplete</p>
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
          questions={quizData?.questions[0][topic?.name!]}
          topic={topic}
        />
      )}
    </>
  );
};

export default TodaysPlan;
