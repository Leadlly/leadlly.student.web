"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

import { TQuizAnswerProps, TQuizQuestionProps } from "@/helpers/types";

import { ArrowLeft, Check, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { MotionDiv } from "@/components/shared/MotionDiv";
import Modal from "@/components/shared/Modal";

import { sanitizedHtml } from "@/helpers/utils";
import { toast } from "sonner";
import { saveDailyQuiz } from "@/actions/daily_quiz_actions";
import { getUser } from "@/actions/user_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import { weeklyData } from "@/redux/slices/weeklyReportSlice";
import { monthlyData } from "@/redux/slices/monthlyReportSlice";
import { overallData } from "@/redux/slices/overallReportSlice";
import {
  dailyQuizAttemptedQuestions,
  filterCompletedTopics,
} from "@/redux/slices/dailyQuizSlice";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { DialogTitle } from "@/components/ui/dialog";

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

  const { dailyQuizzes } = useAppSelector((state) => state.dailyQuizzes);

  const dailyQuizCurrentTopic = dailyQuizzes.find(
    (quiz) => quiz.topicName === topic?.name
  );
  const quizQuestions = questions || [];
  const answeredIds = new Set([
    ...answeredQuestionIds.map((id) => String(id)),
    ...(dailyQuizCurrentTopic?.attemptedQuestions || []).map((answer) =>
      String(answer.question)
    ),
  ]);
  const answeredCount = quizQuestions.filter((question) =>
    answeredIds.has(String(question._id))
  ).length;
  const firstUnanswered = quizQuestions.findIndex(
    (question) => !answeredIds.has(String(question._id))
  );

  const [activeQuestion, setActiveQuestion] = useState(
    firstUnanswered === -1 ? 0 : firstUnanswered
  );

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [optionSelected, setOptionSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAnswerSelect = (answer: string, optionTag: string, index: number) => {
    setSelectedAnswerIndex(index);

    setSelectedAnswer(answer);
    setOptionSelected(true);

    const formattedData: TQuizAnswerProps = {
      question: quizQuestions[activeQuestion]?._id,
      studentAnswer: answer,
      isCorrect: optionTag === "Correct",
      tag: "daily_quiz",
    };

    if (
      !dailyQuizCurrentTopic?.attemptedQuestions.some(
        (quiz) => quiz.question === formattedData.question
      )
    ) {
      dispatch(
        dailyQuizAttemptedQuestions({
          topicName: topic?.name!,
          attemptedQuestions: [formattedData],
          date: new Date(Date.now()).getDate(),
        })
      );
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");
    setOptionSelected(false);

    if (activeQuestion !== quizQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const onHandleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const answers = dailyQuizCurrentTopic?.attemptedQuestions || [];
      if (onPlannerSubmit) {
        if (!answers.length) {
          toast.error("Answer at least one question before submitting.");
          return;
        }
        await onPlannerSubmit(answers);
        setOpenQuestionDialogBox(false);
        return;
      }
      const res = await saveDailyQuiz({
        data: {
          name: topic?.name!,
          _id: topic?._id!,
          isSubtopic: topic?.isSubtopic!,
        },
        questions: answers,
      });

      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["plannerData"] });
        const userInfo = await getUser();
        dispatch(userData(userInfo.user));
        queryClient.invalidateQueries({ queryKey: ["weeklyReport"] });
        queryClient.invalidateQueries({ queryKey: ["monthlyReport"] });
        queryClient.invalidateQueries({ queryKey: ["overallReport"] });

        if (quizQuestions.length > 0 && answeredCount >= quizQuestions.length) {
          dispatch(filterCompletedTopics({ topicName: topic?.name! }));
        }
        toast.success(res.message);

        setOpenQuestionDialogBox(false);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackSubmit = async () => {
    if (
      questions &&
      questions.length > 0 &&
      dailyQuizCurrentTopic &&
      dailyQuizCurrentTopic?.attemptedQuestions?.length > 0
    ) {
      await onHandleSubmit();
    } else {
      setOpenQuestionDialogBox(false);
    }
  };

  return (
    <Modal setOpenDialogBox={setOpenQuestionDialogBox}>
      {quizQuestions.length > 0 && quizQuestions[activeQuestion] ? (
        <>
          <div className="flex items-center gap-3 bg-primary/[0.2] px-4 py-3 md:px-6">
            <div
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white"
              onClick={handleBackSubmit}
            >
              <ArrowLeft className="h-4 w-4" />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Progress
                value={
                  (quizQuestions.length ? answeredCount / quizQuestions.length : 0) * 100
                }
                className="h-2"
              />
              <p className="shrink-0 text-sm font-bold md:text-base">
                {answeredCount}/{quizQuestions.length}
              </p>
            </div>

            <Button
              className="h-9 shrink-0 rounded-full bg-gradient-to-b from-primary to-[#913AE8] px-4 text-sm font-semibold md:h-11 md:px-6 md:text-base"
              onClick={onHandleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>

          <div className="px-3 md:px-14 flex flex-col md:flex-row items-start gap-3">
            <div className="w-full space-y-5 pb-5">
              <DialogTitle className="text-center text-xl md:text-3xl font-semibold text-black">
                Quiz on <span className="capitalize">{topic?.name}</span>
              </DialogTitle>

              <div className="flex w-full justify-center px-2">
                <ul className="flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-3xl border p-1.5">
                  {quizQuestions.map((ques, index) => (
                    <li
                      key={ques._id}
                      className={cn(
                        "relative cursor-pointer rounded-full px-2.5 py-1 text-sm font-medium",
                        activeQuestion === index && "text-white",
                        answeredIds.has(String(ques._id)) && "pointer-events-none opacity-30"
                      )}
                      onClick={() => {
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
                  ))}
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
                      <div key={image._id} className="relative w-full h-32">
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
                  {(quizQuestions[activeQuestion].options || []).map((option, index) => (
                    <li
                      key={option._id}
                      className={cn(
                        "flex items-center gap-6 text-base md:text-xl text-black font-normal border rounded-xl px-4 py-2 cursor-pointer",
                        optionSelected && option.tag === "Correct"
                          ? "border-primary bg-primary/10"
                          : selectedAnswerIndex === index &&
                              option.tag === "Incorrect"
                            ? "border-[#ff2e2e] bg-[#ff2e2e]/10"
                            : "",
                        optionSelected &&
                          selectedAnswer !== option.name &&
                          "pointer-events-none opacity-50"
                      )}
                      onClick={() =>
                        onAnswerSelect(option.name, option.tag, index)
                      }
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border border-black cursor-pointer flex items-center justify-center",
                          optionSelected && option.tag === "Correct"
                            ? "bg-primary border-none"
                            : selectedAnswerIndex === index &&
                                option.tag === "Incorrect"
                              ? "bg-[#ff2e2e] border-none"
                              : ""
                        )}
                      >
                        {optionSelected && option.tag === "Correct" && (
                          <Check className="w-3 h-3 text-white font-medium" />
                        )}

                        {selectedAnswerIndex === index &&
                          option.tag === "Incorrect" && (
                            <X className="w-3 h-3 text-white font-medium" />
                          )}
                      </div>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizedHtml(option.name),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6 flex w-full items-center justify-center gap-3 md:mb-0 md:justify-end">
                <Button
                  type="button"
                  className="h-10 rounded-full px-6 text-base font-semibold"
                  disabled={activeQuestion === quizQuestions.length - 1}
                  onClick={handleNextQuestion}
                >
                  Next
                </Button>
                {quizQuestions.length > 0 && answeredCount >= quizQuestions.length ? (
                  <Button
                    type="button"
                    className="h-10 rounded-full px-6 text-base font-semibold"
                    onClick={onHandleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit"}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full min-h-96 h-full flex flex-col items-center justify-center space-y-4">
          <p className="text-lg text-muted-foreground font-medium">
            No questions yet!
          </p>
          <Button
            variant={"outline"}
            onClick={() => setOpenQuestionDialogBox(false)}
          >
            Go Back
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default QuestionDialogBox;
