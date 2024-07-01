"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, X } from "lucide-react";
import React, { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Questions, Option } from "@/helpers/types/index";

const DailyStreakDialogBox = ({
  setOpenQuestionDialogBox,
  questions,
}: {
  openQuestionDialogBox: boolean;
  setOpenQuestionDialogBox: (openQuestionDialogBox: boolean) => void;
  questions: Questions;
}) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [attemptedQuestion, setAttemptedQuestion] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Maths");

  const questionData = questions[activeTab.toLowerCase()];

  if (!questionData) return null;

  const { question, options } = questionData;

  const allOptions = options.map((option: Option) => option.name);
  const correctOptions = options.filter((option: Option) => option.tag === "Correct").map((option: Option) => option.name);

  const onAnswerSelect = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);

    if (correctOptions.includes(answer)) {
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

    const tabs = ["Maths", "Physics", "Chemistry"];
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  return (
    <Modal setOpenDialogBox={setOpenQuestionDialogBox}>
      <div className="flex flex-col h-full">
        <div className="bg-primary/[0.3] rounded-b-xl flex items-center justify-between gap-5 md:gap-28 px-5 md:px-12 h-20">
          <div
            className="w-6 h-6 md:w-10 md:h-10 rounded-md bg-white flex items-center justify-center border border-gray-300 cursor-pointer"
            onClick={() => setOpenQuestionDialogBox(false)}>
            <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
          </div>

          <Button className="h-8 md:h-11 bg-gradient-to-b from-primary to-[#913AE8] px-3 md:px-6 rounded-md md:rounded-xl text-base md:text-lg font-semibold">
            Submit
          </Button>
        </div>

        <div className="p-3 md:p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-around gap-4 mb-4 border-b-2 border-gray-300">
            {["Maths", "Physics", "Chemistry"].map((tab) => (
              <button
                key={tab}
                className={cn(
                  "py-4 px-4 text-lg font-semibold",
                  activeTab === tab
                    ? "border-b-4 border-primary text-gray-900 bg-primary/[0.1]"
                    : "text-gray-500"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="px-4 md:px-7 mb-4">
            <p className="text-base md:text-xl flex flex-row text-black font-medium mb-4">
                <span className="mr-2"> Q.</span><span dangerouslySetInnerHTML={{ __html: question }} />
              </p>

              <ul className="flex flex-col gap-2">
                {allOptions.map((option: string, index: number) => (
                  <li
                    key={option}
                    className={cn(
                      "flex items-center gap-6 text-base md:text-xl text-black font-normal px-4 py-2 cursor-pointer",
                      selectedAnswerIndex === index &&
                        correctOptions.includes(option)
                        ? "border-primary bg-primary/10"
                        : selectedAnswerIndex === index &&
                          !correctOptions.includes(option)
                        ? "border-red-500 bg-red-500/10"
                        : ""
                    )}
                    onClick={() => onAnswerSelect(option, index)}>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border border-black cursor-pointer flex items-center justify-center",
                        selectedAnswerIndex === index &&
                          correctOptions.includes(option)
                          ? "bg-primary border-none"
                          : selectedAnswerIndex === index &&
                            !correctOptions.includes(option)
                          ? "bg-red-500 border-none"
                          : ""
                      )}>
                      {selectedAnswerIndex === index &&
                        correctOptions.includes(option) && (
                          <Check className="w-3 h-3 text-white font-medium" />
                        )}

                      {selectedAnswerIndex === index &&
                        !correctOptions.includes(option) && (
                          <X className="w-3 h-3 text-white font-medium" />
                        )}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex justify-center md:justify-center">
              <Button
                type="button"
                className="h-7 md:h-9 px-4 md:px-6 text-base md:text-xl font-semibold"
                onClick={handleNextQuestion}
                disabled={activeTab === "Chemistry"}>
                Next
              </Button>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DailyStreakDialogBox;
