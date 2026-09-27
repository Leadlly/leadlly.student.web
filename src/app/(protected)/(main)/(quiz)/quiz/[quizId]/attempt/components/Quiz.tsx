"use client";
import { useState } from "react";
import Link from "next/link";
import Question from "./Question";
import Options from "./Options";
import SubmitDialog from "./SubmitDialog";
import { TQuizQuestionOptionsProps, TQuizQuestionProps } from "@/helpers/types";
import { getMonthDate } from "@/helpers/utils";
import { toast } from "sonner";
import { saveWeeklyQuizQuestion } from "@/actions/weekly_quiz_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { weeklyQuizData } from "@/redux/slices/weeklyQuizSlice";
import { ArrowLeft, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Quiz = ({
  quizId,
  questions,
  startDate,
  endDate,
  quizType,
}: {
  quizId: string;
  questions: TQuizQuestionProps[];
  startDate: string;
  endDate: string;
  quizType?: string;
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

  const attemptedQuestionAnswers = weekly_quiz_data.find(
    (ques: any) => ques.questionId === questions[currentQuestion]?._id
  );

  const quizData = async () => {
    const formattedData = {
      quizId,
      topic: { name: questions[currentQuestion].topics[0] },
      question: {
        question: questions[currentQuestion]._id,
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

  const isLast = currentQuestion === questions.length - 1;
  const progress =
    questions.length > 0 ? weekly_quiz_data.length / questions.length : 0;

  const handleNextQuestion = async () => {
    if (selectedOption) {
      await quizData();
      setSelectedOption(null);
    }
    if (!isLast) {
      setCurrentQuestion((prev: number) => Math.min(prev + 1, questions.length - 1));
    }
  };

  const handlePrevQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion((prev: number) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/quizzes" className="flex flex-1 text-secondary-text">
          <ArrowLeft className="size-6" />
        </Link>
        <div className="text-center">
          <h1 className="text-base font-bold text-dark-primary">
            {quizType === "mock"
              ? "Full syllabus mock"
              : quizType === "revision"
                ? "Revision quiz"
                : quizType === "chapter"
                  ? "Chapter quiz"
                  : "Weekly Quiz"}
          </h1>
          <p className="text-sm text-secondary-text">
            {getMonthDate(new Date(startDate))} - {getMonthDate(new Date(endDate))}
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <SubmitDialog quizId={quizId} />
        </div>
      </div>

      <div className="mb-3 flex items-center gap-3 px-5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E0E0E0]">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.min(progress, 1) * 100}%` }}
          />
        </div>
        {isSaving === questions[currentQuestion]?._id ? (
          <Loader2 className="size-4 animate-spin text-primary" />
        ) : (
          <span className="text-sm font-bold">
            {weekly_quiz_data.length} / {questions.length}
          </span>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
        <p className="mb-3 text-sm font-semibold text-secondary-text">
          Question {currentQuestion + 1} of {questions.length}:
        </p>
        {questions[currentQuestion] ? (
          <>
            <Question question={questions[currentQuestion]} />
            <Options
              options={questions[currentQuestion]?.options}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              attemptedOption={attemptedQuestionAnswers}
            />
          </>
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center text-center text-sm text-secondary-text">
            <p>No Question Available!!</p>
            <p>Please try the next question.</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-primary/20 p-4">
        <button
          type="button"
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0 || isSaving === questions[currentQuestion]?._id}
          className={cn(
            "flex items-center rounded-lg border-2 border-[#E6E1F0] bg-white px-3 py-2 text-sm font-semibold text-secondary-text",
            currentQuestion === 0 && "opacity-70"
          )}
        >
          <ChevronLeft className="mr-1 size-3" />
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextQuestion}
          disabled={
            isSaving === questions[currentQuestion]?._id ||
            (!selectedOption && isLast)
          }
          className="min-w-[100px] rounded-lg bg-leadlly px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSaving === questions[currentQuestion]?._id ? (
            <Loader2 className="mx-auto size-4 animate-spin" />
          ) : isLast ? (
            "Save"
          ) : selectedOption ? (
            "Save & Next"
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
