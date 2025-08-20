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

const QuestionDialogBox = ({
  setOpenQuestionDialogBox,
  questions,
  topic,
}: {
  openQuestionDialogBox: boolean;
  setOpenQuestionDialogBox: (openQuestionDialogBox: boolean) => void;
  questions: TQuizQuestionProps[];
  topic: { name: string; _id: string; isSubtopic: boolean } | null;
}) => {
  const dispatch = useAppDispatch();

  const { dailyQuizzes } = useAppSelector((state) => state.dailyQuizzes);

  const dailyQuizCurrentTopic = dailyQuizzes.find(
    (quiz) => quiz.topicName === topic?.name
  );

  const [activeQuestion, setActiveQuestion] = useState(
    dailyQuizCurrentTopic ? dailyQuizCurrentTopic?.attemptedQuestions.length : 0
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
      question: questions[activeQuestion]?._id,
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
        })
      );
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");
    setOptionSelected(false);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const onHandleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await saveDailyQuiz({
        data: {
          name: topic?.name!,
          _id: topic?._id!,
          isSubtopic: topic?.isSubtopic!,
        },
        questions: dailyQuizCurrentTopic?.attemptedQuestions!,
      });

      if (res.success) {
        const userInfo = getUser();
        const weeklyReportInfo = getWeeklyReport();
        const monthlyReportInfo = getMonthlyReport();
        const overallReportInfo = getOverallReport();

        const [user, weeklyReport, monthlyReport, overallReport] =
          await Promise.all([
            userInfo,
            weeklyReportInfo,
            monthlyReportInfo,
            overallReportInfo,
          ]);

        dispatch(userData(user.user));
        dispatch(weeklyData(weeklyReport.weeklyReport));
        dispatch(monthlyData(monthlyReport.monthlyReport));
        dispatch(overallData(overallReport.overallReport));

        if (
          dailyQuizCurrentTopic &&
          dailyQuizCurrentTopic.attemptedQuestions.length === questions.length
        ) {
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
      {questions && questions.length > 0 && questions[activeQuestion] ? (
        <>
          <div className="h-20 bg-primary/[0.2] rounded-b-xl flex items-center justify-between gap-5 md:gap-28 px-5 md:px-12">
            <div
              className="w-6 h-6 md:w-10 md:h-10 rounded-md bg-white flex items-center justify-center border border-gray-300 cursor-pointer"
              onClick={handleBackSubmit}
            >
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
            </div>

            <div className="flex-1 flex items-center gap-2 md:gap-5">
              <Progress
                value={
                  (dailyQuizCurrentTopic
                    ? dailyQuizCurrentTopic?.attemptedQuestions?.length /
                      questions?.length
                    : 0) * 100
                }
                className="h-2"
              />
              <p className="text-xs md:text-lg font-bold">
                {dailyQuizCurrentTopic
                  ? dailyQuizCurrentTopic?.attemptedQuestions?.length
                  : 0}
                /{questions.length}
              </p>
            </div>

            <Button
              className="w-20 md:w-28 h-8 md:h-11 bg-gradient-to-b from-primary to-[#913AE8] px-3 md:px-6 rounded-md md:rounded-xl text-base md:text-lg font-semibold"
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
              <h3 className="text-center text-xl md:text-3xl font-semibold text-black">
                Quiz on <span className="capitalize">{topic?.name}</span>
              </h3>

              <div className="flex items-center justify-center w-full">
                <ul className="flex items-center gap-3 border-2 p-1 rounded-md">
                  {questions.map((ques, index) => (
                    <li
                      key={ques._id}
                      className={cn(
                        "relative px-4 py-1 text-base md:text-lg font-medium cursor-pointer",
                        activeQuestion === index && "text-white",
                        dailyQuizCurrentTopic?.attemptedQuestions.some(
                          (quiz) => quiz.question === ques._id
                        ) && "pointer-events-none opacity-30"
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
                          className="absolute rounded-sm h-full w-full bg-primary inset-0 -z-10"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:px-7">
                <p className="text-base md:text-xl text-black font-medium mb-2 flex gap-2.5">
                  <span>{activeQuestion + 1}. </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: sanitizedHtml(questions[activeQuestion].question),
                    }}
                  />
                </p>

                {questions[activeQuestion].images.length > 0 ? (
                  <div className="gap-y-2">
                    {questions[activeQuestion].images.map((image) => (
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
                  {questions[activeQuestion].options.map((option, index) => (
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
              <div className="w-full flex items-center justify-center md:justify-end mb-6 md:mb-0">
                <Button
                  type="button"
                  className="h-7 md:h-9 px-4 md:px-6 text-base md:text-xl font-semibold"
                  disabled={activeQuestion === questions.length - 1}
                  onClick={handleNextQuestion}
                >
                  Next
                </Button>
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
