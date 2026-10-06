"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Loader2, Pencil } from "lucide-react";
import { getQuizReport, submitQuiz } from "@/actions/weekly_quiz_actions";
import BackButton from "./BackButton";
import AttemptAnalysisChart from "./AttemptAnalysisChart";

type Report = Awaited<ReturnType<typeof getQuizReport>>["report"];

const QuizReportView = ({ quizId }: { quizId: string }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getQuizReport(quizId)
      .catch(() => submitQuiz(quizId))
      .then((data) => {
        if (cancelled) return;
        if (!data?.report) {
          setError("Report data is missing for this quiz.");
          return;
        }
        setReport(data.report);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load this report.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [quizId]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center">
        <p className="font-semibold text-dark-primary">{error}</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const totalQuestions =
    report.correctCount + report.incorrectCount + report.unattemptedCount;
  const topics = Object.entries(report.subjectWiseReport ?? {}).flatMap(
    ([subject, value]) =>
      Object.keys(value.topics ?? {}).map((topic) => ({ subject, topic }))
  );

  const subjects = Object.entries(report.subjectWiseReport ?? {});

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6">
      <div className="flex items-center">
        <BackButton />
        <h1 className="flex-1 text-center text-2xl font-semibold">Quiz Report</h1>
        <span className="w-10" />
      </div>

      <section className="rounded-2xl bg-primary/20 p-5">
        <p className="text-xl font-semibold text-primary">Weekly Quiz</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-secondary-text">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {report.createdAt ? format(new Date(report.createdAt), "d MMM yyyy") : "-"}
          </span>
          {report.timeTaken ? (
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {report.timeTaken} min
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            {report.correctCount + report.incorrectCount} / {totalQuestions} Questions
          </span>
        </div>
        <div className="mt-4 flex gap-3">
          <div className="rounded-xl bg-white px-4 py-3">
            <p className="text-xs text-secondary-text">Points</p>
            <p className="text-xl font-semibold">
              {report.totalMarks}
              <span className="text-sm text-secondary-text">/{report.maxScore}</span>
            </p>
          </div>
          <div className="rounded-xl bg-white px-4 py-3">
            <p className="text-xs text-secondary-text">Efficiency</p>
            <p className="text-xl font-semibold">{Math.round(report.overallEfficiency)}%</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E6E1F0] bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold text-secondary-text">Topics Covered</h2>
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {subjects.length ? (
            subjects.map(([subject, value]) => (
              <div key={subject} className="rounded-xl border border-[#E6E1F0] px-3 py-2">
                <p className="text-sm font-semibold capitalize">{subject}</p>
                <p className="text-xs text-secondary-text">
                  {Object.keys(value.topics ?? {}).join(", ") || "-"}
                </p>
              </div>
            ))
          ) : topics.length ? (
            topics.map((item) => (
              <div
                key={`${item.subject}-${item.topic}`}
                className="rounded-xl border border-[#E6E1F0] px-3 py-2"
              >
                <p className="text-sm font-semibold capitalize">{item.subject}</p>
                <p className="text-xs text-secondary-text">{item.topic}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-secondary-text">No topic breakdown yet.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E6E1F0] bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold text-secondary-text">Attempt analysis</h2>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="h-40 w-40 md:h-52 md:w-52">
            <AttemptAnalysisChart
              correctAnswers={report.correctCount}
              incorrectAnswers={report.incorrectCount}
              notAttempted={report.unattemptedCount}
              efficiency={Math.round(report.overallEfficiency)}
            />
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-leadlly-green" />
              Correct - {report.correctCount}
            </p>
            <p>
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-leadlly-red" />
              Incorrect - {report.incorrectCount}
            </p>
            <p>
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-[#D1D5DB]" />
              Not attempted - {report.unattemptedCount}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E6E1F0] bg-white p-4 text-center">
        <h2 className="mb-2 text-left text-lg font-semibold text-secondary-text">Score</h2>
        <p className="text-6xl font-bold text-primary">
          {report.totalMarks}
          <span className="ml-1 text-base font-medium text-secondary-text">marks</span>
        </p>
        <p className="text-sm text-secondary-text">
          Scored out of {report.maxScore} marks ({totalQuestions}Q)
        </p>
      </section>

      <section className="rounded-2xl border border-[#E6E1F0] bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold text-secondary-text">Solutions</h2>
        <div className="space-y-3">
          {(report.questions ?? []).map((item, index) => (
            <div key={index} className="rounded-xl border border-[#E6E1F0] p-3">
              <p className="text-sm font-medium">
                {index + 1}. {item.question?.question || "Question"}
              </p>
              <p className="mt-1 text-xs text-secondary-text">
                Your answer: {item.studentAnswer || "-"} ·{" "}
                {item.isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          ))}
          {!report.questions?.length ? (
            <p className="text-sm text-secondary-text">No saved answers on this report.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default QuizReportView;
