"use client";

import { Suspense, useEffect, useState } from "react";
import { getTodaysDay, getTodaysFormattedDate } from "@/helpers/utils";
import { TDayProps } from "@/helpers/types";
import QuestionDialogBox from "./QuestionDialogBox";
import Loader from "@/components/shared/Loader";
import ToDoListButton from "./ToDoListButton";
import Player from "lottie-react";
import loginAnimation from "../../../../../public/assets/todo_pending_animation.json";

const TodaysPlan = ({ quizData }: { quizData: TDayProps | undefined }) => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState<{ name: string; _id: string } | null>(
    null
  );
  const [hasTopics, setHasTopics] = useState(false);
  useEffect(() => {
    if (quizData) {
      const hasTopicsData =
        quizData.backRevisionTopics.length > 0 ||
        quizData.continuousRevisionTopics.length > 0;
      setHasTopics(hasTopicsData);
    }
    console.log("quizData:", quizData);
    console.log("hasTopics:", hasTopics);
  }, [quizData, hasTopics]);

  if (!quizData) {
    return (
      <div className="h-full rounded-xl p-8 bg-primary/[0.12] flex flex-col items-center justify-center gap-4">
        <div className="w-full text-start space-y-4 ">
          <h2 className="text-2xl text-primary font-bold">Please hold on...</h2>
          <p className="text-sm text-gray-600">
            While your plan is being generated, your itinerary will be ready
            shortly.
          </p>
          <div className="flex items-center justify-center">
            <div className="size-24">
              <Player
                autoplay
                loop
                animationData={loginAnimation}
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // const hasTopics =
  //   quizData.backRevisionTopics.length > 0 ||
  //   quizData.continuousRevisionTopics.length > 0;

  return (
    <>
      {hasTopics ? (
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
              {quizData.backRevisionTopics.map((topicItem) => (
                <ToDoListButton
                  key={topicItem._id}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topicItem}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                />
              ))}
              {quizData.continuousRevisionTopics.map((topicItem) => (
                <ToDoListButton
                  key={topicItem._id}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topicItem}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        // <div className="h-full rounded-xl p-8  gap-4">
        <div className="w-full h-full text-start space-y-3 px-6 bg-primary/[0.12] flex flex-col justify-center">
          <h2 className="text-2xl text-primary font-bold mt-4 md:mt-4 sm:mt-2">
            Please hold on...
          </h2>
          <p className="text-sm text-gray-600 pr-8">
            While your plan is being generated, your itinerary will be ready
            shortly.
          </p>
          <div className="flex items-center justify-center">
            <Player
              autoplay
              loop
              animationData={loginAnimation}
              style={{
                width: 100,
                height: 120,
              }}
            />
          </div>
        </div>
        // </div>
      )}

      {openQuestionDialogBox && topic && (
        <Suspense fallback={<Loader />}>
          <QuestionDialogBox
            openQuestionDialogBox={openQuestionDialogBox}
            setOpenQuestionDialogBox={setOpenQuestionDialogBox}
            questions={quizData.questions[topic.name] || []}
            topic={topic}
          />
        </Suspense>
      )}
    </>
  );
};

export default TodaysPlan;
