import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

import { TQuizQuestionProps } from "@/helpers/types";

import { ArrowLeft, Check, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const QuestionDialogBox = ({
  openQuestionDialogBox,
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

  const {
    question,
    options: { all, correct },
  } = questions[activeQuestion];

  const onAnswerSelect = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);

    if (answer === correct[0]) {
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

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (openQuestionDialogBox) {
        e.preventDefault();
      }
    },
    [openQuestionDialogBox]
  );

  useEffect(() => {
    const handleScrollEvent = (e: WheelEvent) => handleScroll(e);

    if (openQuestionDialogBox) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", handleScrollEvent, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScrollEvent);
    }

    return () => {
      window.removeEventListener("wheel", handleScrollEvent);
      document.body.style.overflow = "auto";
    };
  }, [openQuestionDialogBox, handleScroll]);

  return (
    <div
      className="w-screen h-dvh absolute top-0 left-0 bottom-0 right-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center px-5"
      onClick={() => setOpenQuestionDialogBox(false)}>
      <div
        className="text-black text-3xl shadow-dialog bg-white rounded-xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}>
        <div className="h-20 bg-primary/[0.2] rounded-xl flex items-center justify-between gap-5 md:gap-28 px-5 md:px-12">
          <div
            className="w-6 h-6 md:w-10 md:h-10 rounded-md bg-white flex items-center justify-center border border-gray-300 cursor-pointer"
            onClick={() => setOpenQuestionDialogBox(false)}>
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

          <Button className="h-8 md:h-11 bg-gradient-to-b from-primary to-[#913AE8 px-3 md:px-6 rounded-md md:rounded-xl text-base md:text-lg font-semibold">
            Submit
          </Button>
        </div>

        <div className="px-3 md:px-14 md:py-8 flex flex-col md:flex-row items-start gap-3">
          <div className="md:w-44 py-4 md:border-r-2 border-[#cfcfcf]">
            <p className="text-xs md:text-base text-[#7b7b7b] font-semibold mb-2">
              Questions 1 to {questions.length}:
            </p>

            <ul className="w-full flex items-center justify-center flex-wrap md:flex-col md:items-start md:justify-start gap-4 md:gap-0 px-3 md:px-0">
              {questions.map((ques, index) => (
                <li
                  key={ques.question}
                  className={cn(
                    "flex items-center gap-1 md:gap-3 cursor-pointer py-2 md:py-4 md:w-full transition-all duration-200 ease-in",
                    activeQuestion === index
                      ? "md:border-r-[3px] border-r-primary"
                      : ""
                  )}
                  onClick={() => setActiveQuestion(index)}>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border border-black -mt-[1px] flex items-center justify-center",
                      attemptedQuestion.includes(index)
                        ? "border-green-500"
                        : ""
                    )}>
                    {attemptedQuestion.includes(index) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
                    )}
                  </div>
                  <p className="text-xs md:text-base font-normal text-black leading-none">
                    Question {index + 1}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex-1">
            <h3 className="text-center text-xl md:text-3xl font-semibold text-black">
              Quiz on <span className="capitalize">{topic}</span>
            </h3>

            <div className="px-4 md:px-7 my-7">
              <p className="text-base md:text-xl text-black font-medium mb-2">
                <span>{activeQuestion + 1}. </span>
                {question}
              </p>

              <ul className="flex flex-col justify-start gap-2 px-3 md:px-5">
                {all.map((option, index) => (
                  <li
                    key={option}
                    className={cn(
                      "flex items-center gap-6 text-base md:text-xl text-black font-normal border rounded-xl px-4 py-2 cursor-pointer",
                      selectedAnswerIndex === index &&
                        selectedAnswer === correct[0]
                        ? "border-primary bg-primary/10"
                        : selectedAnswerIndex === index &&
                          selectedAnswer !== correct[0]
                        ? "border-red-500 bg-red-500/10"
                        : ""
                    )}
                    onClick={() => onAnswerSelect(option, index)}>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border border-black cursor-pointer flex items-center justify-center",
                        selectedAnswerIndex === index &&
                          selectedAnswer === correct[0]
                          ? "bg-primary border-none"
                          : selectedAnswerIndex === index &&
                            selectedAnswer !== correct[0]
                          ? "bg-red-500 border-none"
                          : ""
                      )}>
                      {selectedAnswerIndex === index &&
                        selectedAnswer === correct[0] && (
                          <Check className="w-3 h-3 text-white font-medium" />
                        )}

                      {selectedAnswerIndex === index &&
                        selectedAnswer !== correct[0] && (
                          <X className="w-3 h-3 text-white font-medium" />
                        )}
                    </div>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex items-center justify-center md:justify-end mb-6 md:mb-0">
              <Button
                type="button"
                className="h-7 md:h-9 px-4 md:px-6 text-base md:text-xl font-semibold"
                disabled={activeQuestion === questions.length - 1}
                onClick={handleNextQuestion}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDialogBox;
