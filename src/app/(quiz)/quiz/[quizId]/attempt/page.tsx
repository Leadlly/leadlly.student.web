import { getWeeklyQuizQuestions } from "@/actions/weekly_quiz_actions";
import Quiz from "./components/Quiz";

type Props = { params: { quizId: string } };
const page = async ({ params: { quizId } }: Props) => {
  const weeklyQuestions = await getWeeklyQuizQuestions(quizId);

  return (
    <Quiz
      quizId={quizId}
      questions={weeklyQuestions.data.weeklyQuestions}
      startDate={weeklyQuestions.data.startDate}
      endDate={weeklyQuestions.data.endDate}
    />
  );
};
export default page;
