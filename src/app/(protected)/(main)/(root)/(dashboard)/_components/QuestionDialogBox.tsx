"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

import { TQuizAnswerProps, TQuizQuestionProps } from "@/helpers/types";

import { ArrowLeft, Check, Loader2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { MotionDiv } from "@/components/shared/MotionDiv";
import Modal from "@/components/shared/Modal";

import { sanitizedHtml } from "@/helpers/utils";
import { toast } from "sonner";
import { saveDailyQuiz } from "@/actions/daily_quiz_actions";
import { getUser } from "@/actions/user_actions";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { dailyQuizAttemptedQuestions } from "@/redux/slices/dailyQuizSlice";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { DialogTitle } from "@/components/ui/dialog";
import {
  markTopicQuizSynced,
  questionIdOf,
  readTopicQuiz,
  saveTopicQuiz,
} from "@/lib/planner/dailyQuizProgress";

const QuestionDialogBox = ({
  setOpenQuestionDialogBox,
  questions,
  topic,
  onPlannerSubmit,
  answeredQuestionIds = [],
}: {
  openQuestionDialogBox: boolean;
  setOpenQuestionDialogBox: (openQuestionDialogBox: boolean) => void;
  questions: TQuizQuestionProps[];
  topic: { name: string; _id: string; isSubtopic: boolean } | null;
  onPlannerSubmit?: (answers: TQuizAnswerProps[]) => Promise<void>;
  answeredQuestionIds?: string[];
}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const stored = topic ? readTopicQuiz(topic._id, topic.name) : null;
  const quizQuestions =
    stored?.questions?.length && !stored.completed ? stored.questions : questions;

  const initialAnswers = (() => {
    const fromStore = stored?.answers || [];
    const known = new Set(fromStore.map((answer) => String(answer.question)));
    const placeholders = answeredQuestionIds
      .map(String)
      .filter((id) => id && !known.has(id))
      .map(
        (id): TQuizAnswerProps => ({
          question: id,
          studentAnswer: "",
          isCorrect: false,
          tag: "daily_quiz",
        })
      );
    return [...fromStore, ...placeholders];
  })();

  const answersRef = useRef<TQuizAnswerProps[]>(initialAnswers);
  const [answers, setAnswers] = useState<TQuizAnswerProps[]>(initialAnswers);
  const [activeQuestion, setActiveQuestion] = useState(() => {
    const answeredIds = new Set(initialAnswers.map((answer) => String(answer.question)));
    const firstOpen = quizQuestions.findIndex(
      (question) => !answeredIds.has(questionIdOf(question._id))
    );
    return firstOpen === -1 ? Math.max(quizQuestions.length - 1, 0) : firstOpen;
  });
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [optionSelected, setOptionSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const persistingRef = useRef(false);
  const startedSaveRef = useRef(false);

  const activeId = questionIdOf(quizQuestions[activeQuestion]?._id);
  const savedAnswer = answers.find((answer) => answer.question === activeId);
  const locked = Boolean(savedAnswer);

  useEffect(() => {
    if (!savedAnswer) {
      setSelectedAnswer("");
      setSelectedAnswerIndex(null);
      setOptionSelected(false);
      return;
    }
    const index = quizQuestions[activeQuestion]?.options.findIndex(
      (option) => option.name === savedAnswer.studentAnswer
    );
    setSelectedAnswer(savedAnswer.studentAnswer);
    setSelectedAnswerIndex(index >= 0 ? index : null);
    setOptionSelected(true);
  }, [activeQuestion, quizQuestions, savedAnswer]);

  const remember = (nextAnswers: TQuizAnswerProps[], completed = false) => {
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    if (!topic) return;
    saveTopicQuiz({
      topicId: topic._id,
      topicName: topic.name,
      questions: quizQuestions,
      answers: nextAnswers,
      completed,
      synced: false,
    });
  };

  const onAnswerSelect = (answer: string, optionTag: string, index: number) => {
    if (locked || !activeId) return;
    setSelectedAnswerIndex(index);
    setSelectedAnswer(answer);
    setOptionSelected(true);

    const formattedData: TQuizAnswerProps = {
      question: activeId,
      studentAnswer: answer,
      isCorrect: optionTag === "Correct",
      tag: "daily_quiz",
    };
    if (answersRef.current.some((item) => item.question === activeId)) return;
    const nextAnswers = [...answersRef.current, formattedData];
    remember(nextAnswers, nextAnswers.length >= quizQuestions.length);
    dispatch(
      dailyQuizAttemptedQuestions({
        topicName: topic?.name || "",
        attemptedQuestions: [formattedData],
        date: new Date().getDate(),
      })
    );
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");
    setOptionSelected(false);
    if (activeQuestion !== quizQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const persist = async () => {
    if (persistingRef.current || startedSaveRef.current || !topic) return;
    startedSaveRef.current = true;
    const currentAnswers = answersRef.current.filter((answer) => answer.studentAnswer);
    if (!currentAnswers.length) {
      startedSaveRef.current = false;
      return;
    }
    persistingRef.current = true;
    setIsSubmitting(true);
    const completed = currentAnswers.length >= quizQuestions.length;
    remember(currentAnswers, completed);
    try {
      if (onPlannerSubmit) {
        await onPlannerSubmit(currentAnswers);
        markTopicQuizSynced(topic._id, topic.name, completed);
        return;
      }
      const res = await saveDailyQuiz({
        data: {
          name: topic.name,
          _id: topic._id,
          isSubtopic: topic.isSubtopic,
        },
        questions: currentAnswers,
        questionCount: quizQuestions.length,
      });
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      markTopicQuizSynced(topic._id, topic.name, completed);
      if (completed) {
        await queryClient.invalidateQueries({ queryKey: ["plannerData"] });
        const userInfo = await getUser();
        if (userInfo?.user) dispatch(userData(userInfo.user));
        queryClient.invalidateQueries({ queryKey: ["weeklyReport"] });
        queryClient.invalidateQueries({ queryKey: ["monthlyReport"] });
        queryClient.invalidateQueries({ queryKey: ["overallReport"] });
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this quiz.");
    } finally {
      persistingRef.current = false;
      setIsSubmitting(false);
      startedSaveRef.current = false;
    }
  };

  const closeQuiz = async () => {
    await persist();
    setOpenQuestionDialogBox(false);
  };

  const isLastQuestion = activeQuestion === quizQuestions.length - 1;
  const currentAnswered = answers.some((answer) => answer.question === activeId);
  const answeredCount = quizQuestions.filter((question) =>
    answers.some((answer) => answer.question === questionIdOf(question._id))
  ).length;

  return (
    <Modal setOpenDialogBox={setOpenQuestionDialogBox} beforeClose={persist}>
      {quizQuestions.length > 0 && quizQuestions[activeQuestion] ? (
        <>
          <div className="flex items-center gap-3 bg-primary/[0.2] px-4 py-3 md:px-6">
            <div
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white"
              onClick={closeQuiz}
            >
              <ArrowLeft className="h-4 w-4" />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Progress
                value={(answeredCount / quizQuestions.length) * 100}
                className="h-2"
              />
              <p className="shrink-0 text-sm font-bold md:text-base">
                {answeredCount}/{quizQuestions.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 px-3 md:flex-row md:px-14">
            <div className="w-full space-y-5 pb-5">
              <DialogTitle className="text-center text-xl font-semibold text-black md:text-3xl">
                Quiz on <span className="capitalize">{topic?.name}</span>
              </DialogTitle>

              <div className="flex w-full justify-center px-2">
                <ul className="flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-3xl border p-1.5">
                  {quizQuestions.map((ques, index) => {
                    const answered = answers.some(
                      (answer) => answer.question === questionIdOf(ques._id)
                    );
                    return (
                      <li
                        key={questionIdOf(ques._id) || index}
                        className={cn(
                          "relative cursor-pointer rounded-full px-2.5 py-1 text-sm font-medium",
                          activeQuestion === index && "text-white",
                          answered && "pointer-events-none opacity-30"
                        )}
                        onClick={() => {
                          if (answered) return;
                          setSelectedAnswerIndex(null);
                          setSelectedAnswer("");
                          setOptionSelected(false);
                          setActiveQuestion(index);
                        }}
                      >
                        Q{index + 1}
                        {activeQuestion === index && (
                          <MotionDiv
                            layoutId="quiz_questions"
                            transition={{
                              type: "spring",
                              duration: 0.6,
                            }}
                            className="absolute inset-0 -z-10 h-full w-full rounded-full bg-primary"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="min-w-0 md:px-7">
                <p className="mb-2 flex gap-2.5 overflow-x-auto text-base font-medium text-black md:text-xl">
                  <span>{activeQuestion + 1}. </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: sanitizedHtml(quizQuestions[activeQuestion].question),
                    }}
                  />
                </p>

                {(quizQuestions[activeQuestion].images || []).length > 0 ? (
                  <div className="gap-y-2">
                    {(quizQuestions[activeQuestion].images || []).map((image) => (
                      <div
                        key={questionIdOf(image._id) || image.url}
                        className="relative h-32 w-full"
                      >
                        <Image
                          src={image.url}
                          alt="Question Images"
                          fill
                          className="w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                <ul className="flex flex-col justify-start gap-2 px-3 md:px-5">
                  {(quizQuestions[activeQuestion].options || []).map((option, index) => {
                    const chosen = locked
                      ? option.name === savedAnswer?.studentAnswer
                      : selectedAnswerIndex === index;
                    const showCorrect =
                      (locked || optionSelected) &&
                      Boolean(savedAnswer?.studentAnswer) &&
                      option.tag === "Correct";
                    const showWrong =
                      chosen &&
                      Boolean(savedAnswer?.studentAnswer || selectedAnswer) &&
                      option.tag !== "Correct";
                    return (
                      <li
                        key={questionIdOf(option._id) || index}
                        className={cn(
                          "flex cursor-pointer items-center gap-6 rounded-xl border px-4 py-2 text-base font-normal text-black md:text-xl",
                          showCorrect
                            ? "border-primary bg-primary/10"
                            : showWrong
                              ? "border-[#ff2e2e] bg-[#ff2e2e]/10"
                              : "",
                          (locked || optionSelected) && !chosen && option.tag !== "Correct"
                            ? "pointer-events-none opacity-50"
                            : "",
                          locked && "pointer-events-none"
                        )}
                        onClick={() => onAnswerSelect(option.name, option.tag, index)}
                      >
                        <div
                          className={cn(
                            "flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-black",
                            showCorrect
                              ? "border-none bg-primary"
                              : showWrong
                                ? "border-none bg-[#ff2e2e]"
                                : ""
                          )}
                        >
                          {showCorrect ? (
                            <Check className="h-3 w-3 font-medium text-white" />
                          ) : null}
                          {showWrong ? <X className="h-3 w-3 font-medium text-white" /> : null}
                        </div>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: sanitizedHtml(option.name),
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mb-6 flex w-full items-center justify-center md:mb-0 md:justify-end">
                <Button
                  type="button"
                  className="h-10 w-full rounded-full px-6 text-base font-semibold md:w-auto"
                  disabled={isSubmitting || (isLastQuestion && !currentAnswered)}
                  onClick={isLastQuestion ? closeQuiz : handleNextQuestion}
                >
                  {isLastQuestion ? (
                    isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Submit"
                    )
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full min-h-96 w-full flex-col items-center justify-center space-y-4">
          <p className="text-lg font-medium text-muted-foreground">No questions yet!</p>
          <Button variant={"outline"} onClick={() => setOpenQuestionDialogBox(false)}>
            Go Back
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default QuestionDialogBox;
