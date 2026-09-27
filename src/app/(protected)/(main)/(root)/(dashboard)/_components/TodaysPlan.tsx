"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { TDayProps } from "@/helpers/types";
import QuestionDialogBox from "./QuestionDialogBox";
import Loader from "@/components/shared/Loader";
import ToDoListButton from "./ToDoListButton";
// import Player from "lottie-react";
import loginAnimation from "../../../../../../../public/assets/todo_pending_animation.json";
import Link from "next/link";
const Player = dynamic(() => import("lottie-react"), { ssr: false });

const Section = ({
  title,
  count,
  empty,
  children,
}: {
  title: string;
  count: number;
  empty: string;
  children: ReactNode;
}) => (
  <section className="px-1">
    <div className="mb-2 flex items-center justify-between">
      <h4 className="text-base font-semibold text-dark-primary">{title}</h4>
      <span className="text-sm text-secondary-text">{count}</span>
    </div>
    {count === 0 ? (
      <div className="rounded-[22px] bg-[#F6F3FB] px-4 py-4 text-center text-sm text-secondary-text">
        {empty}
      </div>
    ) : (
      <ul className="flex flex-col gap-2">{children}</ul>
    )}
  </section>
);

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

  const dailyTopics = [
    ...quizData.continuousRevisionTopics.map((item) => ({
      ...item,
      isSubtopic: false as const,
    })),
    ...quizData.continuousRevisionSubTopics.map((item) => ({
      ...item,
      isSubtopic: true as const,
    })),
  ];

  return (
    <>
      {hasTopics ? (
        <>
          <div className="flex items-center justify-between lg:mb-3">
            <div className="w-full flex justify-between items-center gap-2">
              <h4 className="text-lg font-semibold text-dark-primary">
                Today&apos;s to-do
              </h4>
              <Link
                href="/planner"
                className="rounded-full bg-[#F4F1FB] px-4 py-2 text-sm font-semibold text-primary"
              >
                Full Planner
              </Link>
            </div>
          </div>

          <div className="custom__scrollbar flex w-full flex-1 flex-col gap-5 overflow-y-auto">
            <Section
              title="Daily revision"
              count={dailyTopics.length}
              empty="No topics for today"
            >
              {dailyTopics.map((topicItem, index) => (
                <ToDoListButton
                  key={topicItem._id}
                  index={index}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topicItem}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                  topicsLength={dailyTopics.length}
                  quizData={quizData}
                />
              ))}
            </Section>

            <Section
              title="Pending revision"
              count={quizData.backRevisionTopics.length}
              empty="No past topics available"
            >
              {quizData.backRevisionTopics.map((topicItem, index) => (
                <ToDoListButton
                  key={topicItem._id}
                  index={index}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topicItem}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                  topicsLength={quizData.backRevisionTopics.length}
                  quizData={quizData}
                />
              ))}
            </Section>

            <Section
              title="Accuracy based revision"
              count={quizData.lowAccuracyTopics?.length ?? 0}
              empty="No low accuracy topics available"
            >
              {(quizData.lowAccuracyTopics ?? []).map((topicItem, index) => (
                <ToDoListButton
                  key={topicItem._id}
                  index={index}
                  setTopic={setTopic}
                  setOpenQuestionDialogBox={setOpenQuestionDialogBox}
                  topic={topicItem}
                  completedTopics={quizData.completedTopics}
                  incompleteTopics={quizData.incompletedTopics}
                  topicsLength={quizData.lowAccuracyTopics.length}
                  quizData={quizData}
                />
              ))}
            </Section>
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
