"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Check, ChevronRightIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TQuizQuestionProps } from "@/helpers/types";
import { DailyPlan, DailyPlanItem } from "@/lib/planner/types";
import { saveDailyQuiz } from "@/actions/daily_quiz_actions";
import {
  markTopicQuizSynced,
  pendingQuizSync,
  questionIdOf,
  readQuizProgress,
  readTopicQuiz,
  saveTopicQuiz,
  StoredQuizTopic,
} from "@/lib/planner/dailyQuizProgress";
import QuestionDialogBox from "./QuestionDialogBox";
import Loader from "@/components/shared/Loader";

const lanes: Array<{
  id: DailyPlanItem["lane"];
  label: string;
  empty: string;
}> = [
  {
    id: "CURRENT_LEARNING",
    label: "Current learning",
    empty: "Log what you studied in class and it will show here.",
  },
  {
    id: "ACCURACY",
    label: "Accuracy revision",
    empty: "No weak topic is ready today.",
  },
  {
    id: "PAST_REVISION",
    label: "Past revision",
    empty: "Nothing is due for memory revision today.",
  },
];

const asQuestions = (raw: unknown[] | undefined): TQuizQuestionProps[] =>
  (raw || []).map((entry) => {
    const question = entry as TQuizQuestionProps;
    return {
      ...question,
      _id: questionIdOf(question._id),
      images: question.images || [],
      options: (question.options || []).map((option) => ({
        ...option,
        _id: questionIdOf(option._id),
      })),
      topics: question.topics || [],
    };
  });

const serverAnsweredIds = (plan: DailyPlan, topicName: string) =>
  (
    plan.answeredQuestions?.[topicName] ||
    plan.answeredQuestions?.[topicName.toLowerCase()] ||
    []
  ).map(String);

const TodaysPlan = ({ plan }: { plan?: DailyPlan | null }) => {
  const queryClient = useQueryClient();
  const [storedTopics, setStoredTopics] = useState<StoredQuizTopic[]>([]);
  const [active, setActive] = useState<{
    name: string;
    id: string;
    questions: TQuizQuestionProps[];
    answeredIds: string[];
  } | null>(null);
  const [emptyTopics, setEmptyTopics] = useState<string[]>([]);

  const refreshStored = () => setStoredTopics(readQuizProgress());

  useEffect(() => {
    refreshStored();
    const pending = pendingQuizSync();
    if (!pending.length) return;
    let cancelled = false;
    (async () => {
      for (const topic of pending) {
        const result = await saveDailyQuiz({
          data: { name: topic.topicName, _id: topic.topicId, isSubtopic: false },
          questions: topic.answers,
          questionCount: topic.questions.length || topic.answers.length,
        });
        if (!result.success || cancelled) continue;
        markTopicQuizSynced(topic.topicId, topic.topicName, topic.completed);
      }
      if (!cancelled) {
        refreshStored();
        await queryClient.invalidateQueries({ queryKey: ["plannerData"] });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [queryClient]);

  if (!plan) {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 px-6 py-8 text-center">
        <h2 className="text-xl font-bold text-primary">Preparing today&apos;s plan</h2>
        <p className="max-w-md text-sm text-secondary-text">
          Log a class topic, or mark chapters you have already studied.
        </p>
      </div>
    );
  }

  const storedFor = (item: DailyPlanItem) =>
    storedTopics.find(
      (topic) =>
        topic.topicId === item.topicId ||
        topic.topicName.trim().toLowerCase() === item.topicName.trim().toLowerCase()
    ) || readTopicQuiz(item.topicId, item.topicName);

  const questionsFor = (item: DailyPlanItem) => {
    const stored = storedFor(item);
    if (stored?.questions?.length && !stored.completed) return stored.questions;
    return asQuestions(
      plan?.questions?.[item.topicName] || plan?.questions?.[item.topicName.toLowerCase()]
    );
  };

  const openQuiz = (item: DailyPlanItem) => {
    if (item.status === "COMPLETED" || storedFor(item)?.completed) return;
    const questions = questionsFor(item);
    if (!questions.length) {
      setEmptyTopics((current) => (current.includes(item.id) ? current : [...current, item.id]));
      return;
    }
    const existing = storedFor(item);
    if (!existing?.questions?.length) {
      saveTopicQuiz({
        topicId: item.topicId,
        topicName: item.topicName,
        questions,
        answers: existing?.answers || [],
        completed: false,
        synced: !existing?.answers?.length,
      });
      refreshStored();
    }
    const localAnswered = (existing?.answers || []).map((answer) => String(answer.question));
    setActive({
      name: item.topicName,
      id: item.topicId,
      questions,
      answeredIds: Array.from(
        new Set([...serverAnsweredIds(plan, item.topicName), ...localAnswered])
      ),
    });
  };

  const visible = (plan.items || []).filter(
    (item) => item.status !== "SKIPPED" && item.status !== "EXPIRED"
  );

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-dark-primary">Today&apos;s plan</h4>
        <Link
          href="/planner"
          className="rounded-full bg-[#F4F1FB] px-4 py-2 text-sm font-semibold text-primary"
        >
          Full Planner
        </Link>
      </div>
      {plan.capacity?.note ? (
        <p className="mb-3 text-sm text-secondary-text">{plan.capacity.note}</p>
      ) : null}
      <div className="custom__scrollbar flex w-full flex-1 flex-col gap-5 overflow-y-auto">
        {lanes.map((lane) => {
          const rows = visible.filter((item) => item.lane === lane.id);
          const bucket =
            lane.id === "ACCURACY"
              ? plan.capacity?.accuracy
              : lane.id === "PAST_REVISION"
                ? plan.capacity?.past
                : null;
          if (!rows.length && lane.id === "CURRENT_LEARNING") return null;
          if (!rows.length && !bucket?.available) return null;
          return (
            <section key={lane.id}>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-base font-semibold text-dark-primary">{lane.label}</h4>
                <span className="text-sm text-secondary-text">
                  {bucket ? `${bucket.used}/${bucket.available}` : rows.length}
                </span>
              </div>
              {rows.length === 0 ? (
                <div className="rounded-[22px] bg-[#F6F3FB] px-4 py-4 text-center text-sm text-secondary-text">
                  {lane.empty}
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {rows.map((item, index) => {
                    const questions = questionsFor(item);
                    const stored = storedFor(item);
                    const serverAnswered = new Set(serverAnsweredIds(plan, item.topicName));
                    const localAnswered = new Set(
                      (stored?.answers || []).map((answer) => String(answer.question))
                    );
                    const answered = questions.filter((question) => {
                      const id = questionIdOf(question._id);
                      return serverAnswered.has(id) || localAnswered.has(id);
                    }).length;
                    const finished =
                      item.status === "COMPLETED" ||
                      Boolean(stored?.completed) ||
                      (questions.length > 0 && answered >= questions.length);
                    const missing = emptyTopics.includes(item.id);
                    const showChapter =
                      index === 0 || rows[index - 1]?.chapterId !== item.chapterId;
                    return (
                      <li key={item.id}>
                        {showChapter ? (
                          <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-primary">
                            <span className="capitalize">{item.subject}</span>
                            {item.chapterName ? ` — ${item.chapterName}` : ""}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => openQuiz(item)}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between rounded-[22px] bg-[#F6F3FB] px-4 py-3.5 text-left",
                            finished || missing ? "pointer-events-none opacity-70" : ""
                          )}
                        >
                          <div className="flex w-full items-start gap-x-2 py-1">
                            {answered > 0 && !finished ? (
                              <span className="text-xs font-medium text-[#B87A07]">
                                <span className="text-lg font-semibold">{answered}</span>/
                                {questions.length}
                              </span>
                            ) : (
                              <span
                                className={cn(
                                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#C4B5FD] p-1 text-white",
                                  finished || missing ? "border-none bg-[#0FD679]/80" : ""
                                )}
                              >
                                {finished || missing ? <Check className="h-4 w-4" /> : null}
                              </span>
                            )}
                            <div className="flex-1 capitalize">
                              <p className="text-sm font-medium leading-tight md:text-base">
                                {item.topicName}
                              </p>
                              {answered > 0 && !finished ? (
                                <Progress
                                  value={(answered / questions.length) * 100}
                                  className="mt-1 h-[6px]"
                                  indicatorClassName="bg-[#B87A07]"
                                />
                              ) : null}
                            </div>
                          </div>
                          <ChevronRightIcon className="size-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
        {plan.quizzes?.weekly || plan.quizzes?.chapter?.length ? (
          <section className="border-t border-[#EFEAF8] pt-3">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Quizzes
            </h4>
            {plan.quizzes?.weekly?.id ? (
              <Link
                href={`/quiz/${plan.quizzes.weekly.id}/attempt`}
                className="block text-sm font-medium text-dark-primary"
              >
                Weekly quiz
              </Link>
            ) : null}
            {(plan.quizzes?.chapter ?? [])
              .filter((quiz) => quiz?.id)
              .map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}/attempt`}
                  className="block text-sm font-medium text-dark-primary"
                >
                  {quiz.name || "Chapter"} chapter quiz
                </Link>
              ))}
          </section>
        ) : null}
      </div>
      {active ? (
        <Suspense fallback={<Loader />}>
          <QuestionDialogBox
            openQuestionDialogBox
            setOpenQuestionDialogBox={(open) => {
              if (!open) {
                refreshStored();
                setActive(null);
              }
            }}
            questions={active.questions}
            answeredQuestionIds={active.answeredIds}
            topic={{ name: active.name, _id: active.id, isSubtopic: false }}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default TodaysPlan;
