"use client";
import TopicsCovered from "./TopicCovered";
import Score from "./Score";
import AttemptAnalysis from "./AttemptAnalysis";
import TopicsEfficiency from "./TopicEfficiency";
import SolutionAnalysis from "./SolutionAnalysis";
import QuizDetails from "./QuizDetails";
import { getQuizReport } from "@/actions/weekly_quiz_actions";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
type Props = {};

interface topicWithEfficiency {
  topic: string;
  efficiency: number;
}
export type ReportSchema = {
  questions: string[];
  status: number;
  topicsWithEfficiency: topicWithEfficiency[];
};

const Defaultview = (props: Props) => {
  const { quizId } = useParams();

  const [report, setReport] = useState<ReportSchema | null>(null);

  const fetchQuizReport = useCallback(async () => {
    try {
      const report = await getQuizReport(quizId as string);
      setReport(report);
    } catch (err) {
      console.log(err);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) {
      fetchQuizReport();
    }
  }, [quizId, fetchQuizReport]);

  return (
    <div>
      <header>
        <div className="flex justify-center w-full p-4">
          <h1 className=" text-2xl md:text-4xl font-semibold">Quiz Report</h1>
        </div>
        <div className="flex flex-col  items-start justify-between p-5 pb-6 border-b bg-[#9654F42E] gap-16 rounded-lg m-5">
          <QuizDetails />
        </div>
        <div className="flex">
          <TopicsCovered />
          <TopicsEfficiency report={report} />
        </div>
      </header>
      <div className="flex flex-1 gap-5 max-md:mx-5">
        <AttemptAnalysis />
        <Score />
      </div>
      {report && <SolutionAnalysis question={report.questions} />}
    </div>
  );
};
export default Defaultview;
