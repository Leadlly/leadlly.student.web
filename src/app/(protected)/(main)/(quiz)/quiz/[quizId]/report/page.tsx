import QuizReportView from "./components/QuizReportView";

type Props = { params: Promise<{ quizId: string }> };

const Report = async (props: Props) => {
  const { quizId } = await props.params;
  return <QuizReportView quizId={quizId} />;
};

export default Report;
