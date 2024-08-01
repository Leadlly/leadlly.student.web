"use client";
import { useEffect, useState } from "react";
import Question from "./Question";
import Options from "./Options";
import Pagination from "./Pagination";
import SubmitDialog from "./SubmitDialog";
import { TQuizQuestionProps } from "@/helpers/types";
import { getMonthDate } from "@/helpers/utils";

const Quiz = ({
  quizId,
  questions,
  startDate,
  endDate,
}: {
  quizId: string;
  questions: TQuizQuestionProps[];
  startDate: string;
  endDate: string;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    (0 | 1 | 2 | 3 | 4)[]
  >(Array(questions.length).fill(0));

  const handleOptionChange = (index: number, questionNumber: number) => {
    setAnsweredQuestions((prev) => {
      const newPrev = [...prev];
      if (index in [0, 1, 2, 3, 4])
        newPrev[questionNumber] = index as 0 | 1 | 3 | 2 | 4;
      return newPrev;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };
  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentQuestion(pageNumber);
  };
  useEffect(() => {
    setSelectedOption(answeredQuestions[currentQuestion]);
  }, [currentQuestion, answeredQuestions]);
  return (
    <>
      <div className="flex flex-col justify-center gap-3 sm:gap-7 items-center px-5">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-page-title font-semibold">
            Weekly Quiz
          </h1>
          <h2 className="text-[#737373] text-xl md:text-2xl">
            {getMonthDate(new Date(startDate))} -{" "}
            {getMonthDate(new Date(endDate))}
          </h2>
        </div>
        <div className="bg-[#9654F42E] rounded-[10px] p-4 w-full flex justify-between items-center">
          <span className="font-semibold text-[#636363] text-base md:text-2xl">
            Answered:{" "}
            <span className="text-[#9654F4]">
              {answeredQuestions.filter(Boolean).length}
            </span>
            /{questions.length}
          </span>
          <SubmitDialog quizId={quizId} />
        </div>
        <Pagination
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          onPageChange={handlePageChange}
          answeredQuestions={answeredQuestions}
        />
        <div className="w-full sm:border-2 sm:border-[#CFCFCF] rounded-[10px] mb-5">
          <div className="sm:p-7">
            <h4 className="text-[#7C7C7C] font-medium text-xl">
              Question {currentQuestion + 1} :
            </h4>
            <div className="p-5">
              <Question question={questions[currentQuestion]} />
              <Options
                options={questions[currentQuestion].options}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
                questionNumber={currentQuestion}
              />
            </div>
          </div>
          <div className="sm:bg-[#9654F40F] flex justify-center items-center gap-20 py-3">
            <button
              className=" bg-white border border-[#C0C0C0] px-4 py-1 font-semibold  rounded-md"
              onClick={handlePrevQuestion}
            >
              Prev
            </button>
            <button
              className=" bg-[#9654F4] text-white border border-transparent px-4 py-1 font-semibold  rounded-md"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
