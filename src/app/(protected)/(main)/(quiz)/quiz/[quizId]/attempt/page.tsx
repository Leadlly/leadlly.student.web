import { getWeeklyQuizQuestions } from "@/actions/weekly_quiz_actions";
import Quiz from "./components/Quiz";
import QuizDataCleaner from "./components/QuizDataCleaner";

type Props = { params: Promise<{ quizId: string }> };
const page = async (props: Props) => {
  const params = await props.params;

  const {
    quizId
  } = params;

  const weeklyQuestions = await getWeeklyQuizQuestions(quizId);

  return (
    <>
      <QuizDataCleaner endDate={weeklyQuestions.data.endDate} />
      <Quiz
        quizId={quizId}
        questions={weeklyQuestions.data.weeklyQuestions}
        startDate={weeklyQuestions.data.startDate}
        endDate={weeklyQuestions.data.endDate}
      />
    </>
  );
};
export default page;
