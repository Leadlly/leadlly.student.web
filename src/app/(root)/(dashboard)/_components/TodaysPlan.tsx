"use client";

import { Suspense, useState } from "react";

import { getTodaysDay, getTodaysFormattedDate } from "@/helpers/utils";
import { TDayProps } from "@/helpers/types";

import QuestionDialogBox from "./QuestionDialogBox";
import Loader from "@/components/shared/Loader";
import ToDoListButton from "./ToDoListButton";

const TodaysPlan = ({ quizData }: { quizData: TDayProps }) => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState<{ name: string; _id: string } | null>(
    null
  );

  return (
    <>
      <div className="flex items-center justify-between py-3 px-4 md:px-6">
        <div className="w-full flex justify-between items-center gap-2 md:flex-col md:items-start md:gap-1">
          <h4 className="text-base md:text-xl font-semibold">Todo list</h4>
          <p className="text-[10px] md:text-xs mt-[2px] md:mt-0 font-medium text-[#9E9C9C]">
            {getTodaysDay()} {getTodaysFormattedDate()}
          </p>
        </div>
      </div>

      <div className="w-full flex-1 px-4 md:px-6 overflow-y-auto custom__scrollbar">
        <ul className="w-full h-full flex flex-col justify-start gap-2 md:gap-5 xl:gap-1">
          {quizData &&
          (quizData?.backRevisionTopics.length > 0 ||
            quizData.continuousRevisionTopics.length > 0) ? (
            <>
              {quizData?.backRevisionTopics.map((topic) => (
                <ToDoListButton
                  key={topic._id}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topic}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                />
              ))}
              {quizData.continuousRevisionTopics.map((topic) => (
                <ToDoListButton
                  key={topic._id}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topic}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                />
              ))}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No topics for today!
            </div>
          )}
        </ul>
      </div>

      {openQuestionDialogBox && (
        <Suspense fallback={<Loader />}>
          <QuestionDialogBox
            openQuestionDialogBox={openQuestionDialogBox}
            setOpenQuestionDialogBox={setOpenQuestionDialogBox}
            questions={quizData?.questions[topic?.name!]}
            topic={topic}
          />
        </Suspense>
      )}
    </>
  );
};

export default TodaysPlan;
