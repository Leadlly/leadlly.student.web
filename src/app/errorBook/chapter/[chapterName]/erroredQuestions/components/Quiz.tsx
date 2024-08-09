"use client";
import { useEffect, useState, useTransition } from "react";
import Options from "./Options";
import Pagination from "./Pagination";
import SubmitDialog from "./SubmitDialog";
import { updateErrorNote } from "@/actions/error_book_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Question from "./Question";

interface OptionType {
  name: string;
  tag: string;
  images: string | null;
  _id: string;
}

interface QuestionType {
  _id: string;
  question: string;
  options: OptionType[];
  standard: number;
  subject: string;
  chapter: string[];
  topics: string[];
  subtopics: string[];
  level: string;
  images: string[];
  createdBy: string;
  createdAt: string;
  __v: number;
}

interface SolvedQuestionType {
  _id: string;
  student: string;
  question: QuestionType;
  studentAnswer: string;
  isCorrect: boolean;
  tag: string;
  createdAt: string;
  __v: number;
}

interface QuizProps {
  quizId?: string;
  questions: SolvedQuestionType[];
  questionTitle: string;
  subtitle: string;
}

export interface AnsweredQuestion {
  questionId: string;
  isCorrect: boolean | null;
  selectedOption: string | null;
}

const Quiz = ({ quizId, questions, questionTitle, subtitle }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >(
    questions.map((question) => ({
      questionId: question._id,
      selectedOption: null,
      isCorrect: null,
    }))
  );

  const handleOptionChange = (answerId: string, questionId: string) => {
    setAnsweredQuestions((prev) =>
      prev.map((question) =>
        question.questionId === questionId
          ? {
              ...question,
              selectedOption: answerId,
              isCorrect:
                questions[currentQuestion].question.options.find(
                  (option) => option._id === answerId
                )?.tag === "Correct",
            }
          : question
      )
    );
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

  const handleSubmit = () => {
    startTransition(async () => {
      try {
				
        setIsSubmitting(true);
        await updateErrorNote({
          questionIds: answeredQuestions
            .map((questions) => {
              return questions.isCorrect ? questions.questionId : null;
            })
            .filter((id): id is string => id !== null),
        });
        router.replace("/error-book");
      } catch (error) {
        console.error("Error submitting quiz:", error);
        toast.error("failed to submit try again");
      }
    });
  };
  if (isSubmitting) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-center gap-3 sm:gap-7 items-center px-5">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl md:text-4xl lg:text-page-title font-semibold">
          {questionTitle}
        </h1>
        <h2 className="text-[#737373] text-xl md:text-2xl">{subtitle}</h2>
      </div>
      <div className="bg-[#9654F42E] rounded-[10px] p-4 w-full flex justify-between items-center">
        <span className="font-semibold text-[#636363] text-base md:text-2xl">
          Answered:{" "}
          <span className="text-[#9654F4]">
            {answeredQuestions.filter((q) => q.selectedOption !== null).length}
          </span>
          /{questions.length}
        </span>
        <SubmitDialog onSubmit={handleSubmit} />
      </div>
      <Pagination
        totalQuestions={questions.length}
        currentQuestion={currentQuestion}
        onPageChange={handlePageChange}
        answeredQuestions={answeredQuestions.map(
          (q) => q.selectedOption !== null
        )}
      />
      <div className="w-full sm:border-2 sm:border-[#CFCFCF] rounded-[10px]">
        <div className="sm:p-7">
          <h4 className="text-[#7C7C7C] font-medium text-xl">
            Question {currentQuestion + 1} :
          </h4>
          <div className="p-5">
            <Question question={questions[currentQuestion].question} />
            <Options
              options={questions[currentQuestion].question.options}
              selectedOption={answeredQuestions[currentQuestion].selectedOption}
              handleOptionChange={handleOptionChange}
              questionId={questions[currentQuestion]._id}
            />
          </div>
        </div>
        <div className="sm:bg-[#9654F40F] flex justify-center items-center gap-20 py-3">
          <button
            className="bg-white border border-[#C0C0C0] px-4 py-1 font-semibold rounded-md"
            onClick={handlePrevQuestion}
          >
            Prev
          </button>
          <button
            className="bg-[#9654F4] text-white border border-transparent px-4 py-1 font-semibold rounded-md"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
