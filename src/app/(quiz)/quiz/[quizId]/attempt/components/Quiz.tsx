"use client";
import { useEffect, useState } from "react";
import Question from "./Question";
import Options from "./Options";
import Pagination from "./Pagination";
import SubmitDialog from "./SubmitDialog";
import {
  TQuizAnswerProps,
  TQuizQuestionOptionsProps,
  TQuizQuestionProps,
} from "@/helpers/types";
import { getMonthDate } from "@/helpers/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveWeeklyQuizQuestion } from "@/actions/weekly_quiz_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { weeklyQuizData } from "@/redux/slices/weeklyQuizSlice";
import { Loader2 } from "lucide-react";

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
  const weekly_quiz_data = useAppSelector(
    (state) => state.weeklyQuizzes.quizzes
  );

  const [currentQuestion, setCurrentQuestion] = useState(
    weekly_quiz_data.length > 0 ? weekly_quiz_data.length : 0
  );
  const [selectedOption, setSelectedOption] =
    useState<TQuizQuestionOptionsProps | null>(null);

  const [isSaving, setIsSaving] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const questionIds = questions.map((ques) => ques._id);

  const storedQuestionIds = weekly_quiz_data.map(
    (data: {
      questionId: string;
      quizId: string;
      topic: { name: string };
      question: TQuizAnswerProps;
    }) => data.questionId
  );

  const attemptedQuestionAnswers = weekly_quiz_data.find(
    (ques: any) => ques.questionId === questions[currentQuestion]?._id
  );

  const quizData = async () => {
    const formattedData = {
      quizId,
      topic: { name: questions[currentQuestion].topics[0] },
      question: {
        question: questions[currentQuestion],
        studentAnswer: selectedOption?.name!,
        isCorrect: selectedOption?.tag === "Correct",
        tag: "weekly_quiz",
      },
    };
    setIsSaving(questions[currentQuestion]._id);
    try {
      const res = await saveWeeklyQuizQuestion(formattedData);
      dispatch(
        weeklyQuizData({
          questionId: questions[currentQuestion]._id,
          ...formattedData,
        })
      );
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(null);
    }
  };

  const handleOptionChange = (option: TQuizQuestionOptionsProps) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption) {
      await quizData();
      setSelectedOption(null);
    }
    setCurrentQuestion((prev: any) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev: any) => Math.max(prev - 1, 0));
  };

  const handlePageChange = async (pageNumber: number) => {
    setCurrentQuestion(pageNumber);
  };

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
        <div className="bg-primary/10 rounded-[10px] p-4 w-full flex justify-between items-center">
          <span className="font-semibold text-[#636363] text-base md:text-2xl">
            Answered:{" "}
            <span className="text-primary">{weekly_quiz_data.length}</span>/
            {questions.length}
          </span>
          <SubmitDialog quizId={quizId} />
        </div>
        <Pagination
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          onPageChange={handlePageChange}
          questionIds={questionIds}
          storedQuestionIds={storedQuestionIds}
          currentQuestionId={questions[currentQuestion]?._id}
          loading={isSaving}
        />
        <div className="w-full sm:border-2 sm:border-[#CFCFCF] rounded-[10px] mb-5">
          <div className="sm:p-7">
            <h4 className="text-[#7C7C7C] font-medium text-xl">
              Question {currentQuestion + 1} :
            </h4>
            <div className="p-5">
              <Question question={questions[currentQuestion]} />
              <Options
                options={questions[currentQuestion]?.options}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
                attemptedOption={attemptedQuestionAnswers}
              />
            </div>
          </div>
          <div className="sm:bg-[#9654F40F] flex justify-center items-center gap-20 py-3">
            <Button variant={"outline"} onClick={handlePrevQuestion}>
              Prev
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={
                isSaving === questions[currentQuestion]?._id ||
                currentQuestion === questions.length - 1
              }
            >
              {isSaving === questions[currentQuestion]?._id ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <>{selectedOption ? "Save & Next" : "Next"}</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
