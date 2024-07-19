"use client";

import { Suspense, useEffect, useState } from "react";

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
import Loader from "@/components/shared/Loader";
import ToDoListButton from "./ToDoListButton";
import ToDoSkeleton from "./_skeletons/ToDoSkeleton";
import { toast } from "sonner";

const TodaysPlan = () => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState<{ name: string; _id: string } | null>(
    null
  );
  const [quizData, setQuizData] = useState<TDayProps | null>(null);
  const [isLoadingQuizData, setIsLoadingQuizData] = useState(false);

  const completedTopics: { expiryDate: number; value: string[] } | null =
    useReadLocalStorage("completed_topic");

  const incompleteTopics: { expiryDate: number; value: string[] } | null =
    useReadLocalStorage("incomplete_topic");

  const isMounted = useIsMounted();

  useEffect(() => {
    const getQuestionData = async () => {
      setIsLoadingQuizData(true);
      try {
        const { data }: DataProps = await getPlanner();

        setQuizData(
          data?.days.filter(
            (item) =>
              getFormattedDate(new Date(item.date)) ===
              getFormattedDate(new Date(Date.now()))
          )[0] || null
        );
      } catch (error: any) {
        toast.error("Failed to fetch Quiz Topics!", {
          description: error.message,
        });
      } finally {
        setIsLoadingQuizData(false);
      }
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
  }, [isMounted, completedTopics, incompleteTopics]);

  if (isLoadingQuizData) {
    return <ToDoSkeleton />;
  }

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
                  completedTopics={completedTopics!}
                  incompleteTopics={incompleteTopics!}
                />
              ))}
              {quizData.continuousRevisionTopics.map((topic) => (
                <ToDoListButton
                  key={topic._id}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topic}
                  completedTopics={completedTopics!}
                  incompleteTopics={incompleteTopics!}
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
