import Link from "next/link";
import { getWeeklyQuizQuestions } from "@/actions/weekly_quiz_actions";
import Quiz from "./components/Quiz";
import QuizDataCleaner from "./components/QuizDataCleaner";

type Props = { params: Promise<{ quizId: string }> };

const page = async (props: Props) => {
  const params = await props.params;
  const { quizId } = params;

  const weeklyQuestions = await getWeeklyQuizQuestions(quizId).catch(() => ({
    success: false,
    data: null,
    message: "Could not load this quiz.",
  }));

  const data = weeklyQuestions?.data;
  const questions = Array.isArray(data?.weeklyQuestions)
    ? data.weeklyQuestions
    : [];

  if (!data || !questions.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="text-xl font-semibold text-dark-primary">
          Quiz unavailable
        </h1>
        <p className="max-w-sm text-sm text-secondary-text">
          {weeklyQuestions?.message ||
            "This quiz could not be loaded. It may have expired or has no questions yet."}
        </p>
        <Link
          href="/quizzes"
          className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
        >
          Back to quizzes
        </Link>
      </div>
    );
  }

  const startDate = data.startDate ? String(data.startDate) : "";
  const endDate = data.endDate ? String(data.endDate) : "";

  return (
    <>
      {endDate ? <QuizDataCleaner endDate={endDate} /> : null}
      <Quiz
        quizId={quizId}
        questions={questions}
        startDate={startDate}
        endDate={endDate}
        quizType={data.quizType}
      />
    </>
  );
};

export default page;
