"use client";

import { Suspense, useState } from "react";
import { getTodaysDay, getTodaysFormattedDate } from "@/helpers/utils";
import { TDayProps } from "@/helpers/types";

import QuestionDialogBox from "./QuestionDialogBox";
import Loader from "@/components/shared/Loader";
import ToDoListButton from "./ToDoListButton";
import { Text, View } from "lucide-react";
import { MotionDiv } from "@/components/shared/MotionDiv";

const TodaysPlan = ({ quizData }: { quizData: TDayProps | undefined }) => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState<{ name: string; _id: string } | null>(null);
  console.log("Quiz Data:", quizData);

  const hasTopics =
    quizData &&
    (quizData.backRevisionTopics.length > 0 || quizData.continuousRevisionTopics.length > 0);

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
          {hasTopics ? (
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
            <View className="flex-1 justify-center px-5 space-y-5">
              <Text className="text-xl text-primary font-mada-Bold leading-tight">
                Please hold on...
              </Text>
              <Text className="text-sm leading-tight font-mada-regular text-tab-item-gray">
                While your plan is being generated, your itinerary will be ready shortly.
              </Text>
              <View className="items-center justify-center">
                <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <img alt="Loading illustration" />
                </MotionDiv>
              </View>
            </View>
          )}
        </ul>
      </div>

      {openQuestionDialogBox && (
        <Suspense fallback={<Loader />}>
          <QuestionDialogBox
            openQuestionDialogBox={openQuestionDialogBox}
            setOpenQuestionDialogBox={setOpenQuestionDialogBox}
            questions={quizData?.questions[topic?.name!] || []} // Provide a default value
            topic={topic}
          />
        </Suspense>
      )}
    </>
  );
};

export default TodaysPlan;
