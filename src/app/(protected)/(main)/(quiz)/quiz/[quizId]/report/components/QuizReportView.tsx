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
        if (!cancelled) setReport(data.report);
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

  return (
    <div className="pb-10">
      <header className="flex flex-col gap-6 border-b bg-[#9654F42E] p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <BackButton />
          <h1 className="text-2xl font-semibold sm:text-4xl">Quiz Report</h1>
          <span className="w-8" />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-2xl font-semibold text-primary">Quiz</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-secondary-text">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {report.createdAt
                  ? format(new Date(report.createdAt), "d MMM yyyy")
                  : "—"}
              </span>
              {report.timeTaken ? (
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {report.timeTaken} min
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                {report.correctCount + report.incorrectCount} / {totalQuestions}{" "}
                Questions
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl bg-white px-4 py-3 shadow-card">
              <p className="text-xs text-secondary-text">Points</p>
              <p className="text-xl font-semibold">
                {report.totalMarks}
                <span className="text-sm text-secondary-text">
                  /{report.maxScore}
                </span>
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 shadow-card">
              <p className="text-xs text-secondary-text">Efficiency</p>
              <p className="text-xl font-semibold">
                {Math.round(report.overallEfficiency)}%
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-2 sm:p-6">
        <section className="rounded-[10px] p-4 shadow-section">
          <h2 className="mb-3 text-lg font-semibold text-[#9E9E9E]">Topics covered</h2>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {topics.length ? (
              topics.map((item) => (
                <div
                  key={`${item.subject}-${item.topic}`}
                  className="rounded-xl border border-black/10 px-3 py-2"
                >
                  <p className="text-sm font-medium capitalize">{item.subject}</p>
                  <p className="text-xs text-secondary-text">{item.topic}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-secondary-text">No topic breakdown yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-[10px] p-4 shadow-section">
          <h2 className="mb-3 text-lg font-semibold text-[#9E9E9E]">Score</h2>
          <p className="text-6xl font-bold text-primary">{report.totalMarks}</p>
          <p className="text-sm text-secondary-text">
            Scored out of {report.maxScore} marks ({totalQuestions}Q)
          </p>
        </section>

        <section className="rounded-[10px] p-4 shadow-section lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-[#9E9E9E]">
            Attempt analysis
          </h2>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="h-40 w-40 md:h-56 md:w-56">
              <AttemptAnalysisChart
                correctAnswers={report.correctCount}
                incorrectAnswers={report.incorrectCount}
                notAttempted={report.unattemptedCount}
                efficiency={Math.round(report.overallEfficiency)}
              />
            </div>
            <div className="space-y-2 text-sm md:text-base">
              <p>
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-leadlly-green" />
                Correct — {report.correctCount}
              </p>
              <p>
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-leadlly-red" />
                Incorrect — {report.incorrectCount}
              </p>
              <p>
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-[#D1D5DB]" />
                Not attempted — {report.unattemptedCount}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[10px] p-4 shadow-section lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-[#9E9E9E]">Solutions</h2>
          <div className="space-y-3">
            {(report.questions ?? []).map((item, index) => (
              <div key={index} className="rounded-xl border border-black/10 p-3">
                <p className="text-sm font-medium">
                  {index + 1}. {item.question?.question || "Question"}
                </p>
                <p className="mt-1 text-xs text-secondary-text">
                  Your answer: {item.studentAnswer || "—"} ·{" "}
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
    </div>
  );
};

export default QuizReportView;
