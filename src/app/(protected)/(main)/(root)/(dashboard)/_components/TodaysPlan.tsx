"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { TDayProps } from "@/helpers/types";
import QuestionDialogBox from "./QuestionDialogBox";
import Loader from "@/components/shared/Loader";
import ToDoListButton from "./ToDoListButton";
// import Player from "lottie-react";
import loginAnimation from "../../../../../../../public/assets/todo_pending_animation.json";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Player = dynamic(() => import("lottie-react"), { ssr: false });

const TodaysPlan = ({ quizData }: { quizData: TDayProps | undefined }) => {
  const [openQuestionDialogBox, setOpenQuestionDialogBox] = useState(false);
  const [topic, setTopic] = useState<{
    name: string;
    _id: string;
    isSubtopic: boolean;
  } | null>(null);
  const [hasTopics, setHasTopics] = useState(false);

  useEffect(() => {
    if (quizData) {
      const hasTopicsData =
        quizData.backRevisionTopics.length > 0 ||
        quizData.continuousRevisionTopics.length > 0 ||
        quizData.continuousRevisionSubTopics.length > 0 ||
        (quizData.lowAccuracyTopics && quizData.lowAccuracyTopics.length > 0) ||
        quizData.chapters.length > 0;

      setHasTopics(hasTopicsData);
    }
  }, [quizData]);

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

  return (
    <>
      {hasTopics ? (
        <>
          <div className="flex items-center justify-between lg:mb-3">
            <div className="w-full flex justify-between items-center gap-2">
              <h4 className="text-base md:text-xl font-semibold">
                Today&apos;s Planner
              </h4>
              <Link
                href={"/planner"}
                className="text-xs md:text-sm mt-[2px] md:mt-0 font-medium text-primary underline"
              >
                Full Planner
              </Link>
            </div>
          </div>

          <div className="w-full flex-1 border rounded-xl overflow-y-auto custom__scrollbar">
            <div>
              <h4 className="text-base font-medium text-[#787878] mb-2 p-4 pb-1">
                Daily Topics
              </h4>
              <ul className="w-full h-full flex flex-col justify-start gap-1 max-h-52 overflow-y-auto custom__scrollbar px-4">
                {[
                  ...quizData.continuousRevisionTopics.map((item) => ({
                    ...item,
                    isSubtopic: false,
                  })),
                  ...quizData.continuousRevisionSubTopics.map((item) => ({
                    ...item,
                    isSubtopic: true,
                  })),
                ].map((topicItem, index) => (
                  <ToDoListButton
                    key={topicItem._id}
                    index={index}
                    setTopic={setTopic}
                    setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                    topic={topicItem}
                    completedTopics={quizData.completedTopics}
                    incompleteTopics={quizData.incompletedTopics}
                    topicsLength={
                      quizData.backRevisionTopics.length +
                      quizData.continuousRevisionTopics.length
                    }
                    quizData={quizData}
                  />
                ))}
              </ul>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4">
                  <h4 className="text-base font-medium text-[#787878] mb-2">
                    Unrevised Topics
                  </h4>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="w-full h-full flex flex-col justify-start gap-2 md:gap-5 xl:gap-1 max-h-96 overflow-y-auto custom__scrollbar p-4 pt-0">
                    {quizData.backRevisionTopics.map((topicItem, index) => (
                      <ToDoListButton
                        key={topicItem._id}
                        index={index}
                        setTopic={setTopic}
                        setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                        topic={topicItem}
                        completedTopics={quizData.completedTopics}
                        incompleteTopics={quizData.incompletedTopics}
                        topicsLength={
                          quizData.backRevisionTopics.length +
                          quizData.continuousRevisionTopics.length
                        }
                        quizData={quizData}
                      />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      ) : (
        <div className="w-full h-full text-start space-y-3 px-6 bg-primary/[0.12] flex flex-col justify-center rounded-xl">
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
