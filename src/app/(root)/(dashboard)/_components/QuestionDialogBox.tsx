"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

import { TQuizQuestionProps } from "@/helpers/types";

import { ArrowLeft, Check, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { MotionDiv } from "@/components/shared/MotionDiv";
import Modal from "@/components/shared/Modal";

import DOMPurify from "dompurify";
import { sanitizedHtml } from "@/helpers/utils";

const QuestionDialogBox = ({
  setOpenQuestionDialogBox,
  questions,
  topic,
}: {
  openQuestionDialogBox: boolean;
  setOpenQuestionDialogBox: (openQuestionDialogBox: boolean) => void;
  questions: TQuizQuestionProps[];
  topic: string;
}) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [attemptedQuestion, setAttemptedQuestion] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  console.log(questions);

  const { question, options } = questions[activeQuestion];

  const onAnswerSelect = (answer: string, optionTag: string, index: number) => {
    setSelectedAnswerIndex(index);

    if (optionTag === "Correct") {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }

    if (!attemptedQuestion.includes(activeQuestion) && !selectedAnswer) {
      setAttemptedQuestion((prev) => [...prev, activeQuestion]);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  return (
    <Modal setOpenDialogBox={setOpenQuestionDialogBox}>
      <div className="h-20 bg-primary/[0.2] rounded-b-xl flex items-center justify-between gap-5 md:gap-28 px-5 md:px-12">
        <div
          className="w-6 h-6 md:w-10 md:h-10 rounded-md bg-white flex items-center justify-center border border-gray-300 cursor-pointer"
          onClick={() => setOpenQuestionDialogBox(false)}
        >
          <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
        </div>

        <div className="flex-1 flex items-center gap-2 md:gap-5">
          <Progress
            value={(attemptedQuestion.length / questions.length) * 100}
            className="h-2"
          />
          <p className="text-xs md:text-lg font-bold">
            {attemptedQuestion.length}/{questions.length}
          </p>
        </div>

        <Button className="h-8 md:h-11 bg-gradient-to-b from-primary to-[#913AE8] px-3 md:px-6 rounded-md md:rounded-xl text-base md:text-lg font-semibold">
          Submit
        </Button>
      </div>

      <div className="px-3 md:px-14 flex flex-col md:flex-row items-start gap-3">
        {/* <div className="md:w-44 py-4 md:border-r-2 border-[#cfcfcf]">
          <p className="text-xs md:text-base text-[#7b7b7b] font-semibold mb-2">
            Questions 1 to {questions.length}:
          </p>

          <ul className="w-full flex items-center justify-center flex-wrap md:flex-col md:items-start md:justify-start gap-4 md:gap-0 px-3 md:px-0">
            {questions.map((ques, index) => (
              <li
                key={ques.question}
                className={cn(
                  "relative flex items-center gap-1 md:gap-3 cursor-pointer py-2 md:py-4 md:w-full transition-all duration-200 ease-in"
                )}
                onClick={() => setActiveQuestion(index)}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border border-black -mt-[1px] flex items-center justify-center",
                    attemptedQuestion.includes(index) ? "border-green-500" : ""
                  )}
                >
                  {attemptedQuestion.includes(index) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
                  )}
                </div>
                <p className="text-xs md:text-base font-normal text-black leading-none">
                  Question {index + 1}
                </p>
                {activeQuestion === index && (
                  <MotionDiv
                    layoutId="quiz_questions"
                    transition={{
                      type: "spring",
                      duration: 0.6,
                    }}
                    className="hidden md:block absolute rounded-sm h-full w-1 bg-primary inset-y-0 right-0"
                  />
                )}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="w-full space-y-5 pb-5">
          <h3 className="text-center text-xl md:text-3xl font-semibold text-black">
            Quiz on <span className="capitalize">{topic}</span>
          </h3>

          <div className="flex items-center justify-center w-full">
            <ul className="flex items-center gap-3 border-2 p-1 rounded-md">
              {questions.map((ques, index) => (
                <li
                  key={ques._id}
                  className={cn(
                    "relative px-4 py-1 text-base md:text-lg font-medium cursor-pointer",
                    activeQuestion === index && "text-white"
                  )}
                  onClick={() => setActiveQuestion(index)}
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
                  __html: sanitizedHtml(question),
                }}
              />
            </p>

            <ul className="flex flex-col justify-start gap-2 px-3 md:px-5">
              {options.map((option, index) => (
                <li
                  key={option._id}
                  className={cn(
                    "flex items-center gap-6 text-base md:text-xl text-black font-normal border rounded-xl px-4 py-2 cursor-pointer",
                    selectedAnswerIndex === index && option.tag === "Correct"
                      ? "border-primary bg-primary/10"
                      : selectedAnswerIndex === index &&
                          option.tag === "Incorrect"
                        ? "border-red-500 bg-red-500/10"
                        : ""
                  )}
                  onClick={() => onAnswerSelect(option.name, option.tag, index)}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border border-black cursor-pointer flex items-center justify-center",
                      selectedAnswerIndex === index && option.tag === "Correct"
                        ? "bg-primary border-none"
                        : selectedAnswerIndex === index &&
                            option.tag === "Incorrect"
                          ? "bg-red-500 border-none"
                          : ""
                    )}
                  >
                    {selectedAnswerIndex === index &&
                      option.tag === "Correct" && (
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
    </Modal>
  );
};

export default QuestionDialogBox;
