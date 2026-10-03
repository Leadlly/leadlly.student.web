"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WeeklyQuizProps } from "@/helpers/types";
import { calculateDaysLeft, capitalizeFirstLetter, formatDate } from "@/helpers/utils";
import { cn } from "@/lib/utils";

const subjectTone = (subject: string) => {
  const name = subject.toLowerCase();
  if (name.includes("physics")) {
    return { bg: "bg-[#ECFDF5]", color: "text-[#10B981]", dot: "bg-[#10B981]" };
  }
  if (name.includes("chemistry")) {
    return { bg: "bg-[#F5F3FF]", color: "text-[#8B5CF6]", dot: "bg-[#8B5CF6]" };
  }
  return { bg: "bg-[#EFF6FF]", color: "text-[#3B82F6]", dot: "bg-[#3B82F6]" };
};

const topicsBySubject = (quiz: WeeklyQuizProps) => {
  const grouped: Record<string, string[]> = {};
  Object.entries(quiz.questions ?? {}).forEach(([topic, questions]) => {
    const subject = questions[0]?.subject || "Other";
    grouped[subject] ??= [];
    if (!grouped[subject].includes(topic)) grouped[subject].push(topic);
  });
  return grouped;
};

const WeeklyQuizCard = ({
  quiz,
  mode,
}: {
  quiz: WeeklyQuizProps;
  mode: "unattempted" | "attempted";
}) => {
  const [open, setOpen] = useState(false);
  const end = quiz.endDate ? new Date(quiz.endDate) : null;
  const start = quiz.createdAt || quiz.startDate
    ? new Date(quiz.createdAt || quiz.startDate)
    : null;
  const daysLeft =
    end && !Number.isNaN(end.getTime()) ? calculateDaysLeft(end) : 0;
  const totalQuestions = useMemo(
    () => Object.values(quiz.questions ?? {}).flat().length,
    [quiz]
  );
  const dateRange =
    start &&
    end &&
    !Number.isNaN(start.getTime()) &&
    !Number.isNaN(end.getTime())
      ? `${formatDate(start)} - ${formatDate(end)}`
      : "Quiz window unavailable";
  const topics = topicsBySubject(quiz);
  const quizId = quiz?._id ? String(quiz._id) : "";

  return (
    <article className="rounded-[34px] border border-[#E6E1F0] p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-dark-primary md:text-2xl">{dateRange}</h3>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-label="Quiz topics"
        >
          <Info className="size-4" />
        </button>
      </div>

      <p className="mt-1 text-sm font-semibold text-secondary-text">
        {quiz.quizType === "mock" ? "Full syllabus mock · " : ""}
        {totalQuestions} Quiz Questions
      </p>

      {mode === "unattempted" ? (
        <p
          className={cn(
            "mt-3 text-right text-xs font-bold",
            daysLeft <= 0
              ? "text-leadlly-red"
              : daysLeft <= 1
                ? "text-leadlly-yellow"
                : "text-leadlly-green"
          )}
        >
          {daysLeft <= 0
            ? "Quiz Closed"
            : daysLeft <= 1
              ? "Quiz closes soon"
              : `Remaining ${daysLeft} days to Take Quiz`}
        </p>
      ) : null}

      {mode === "unattempted" && daysLeft > 0 && quizId ? (
        <Link
          href={`/quiz/${quizId}/attempt`}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-leadlly text-base font-bold text-white"
        >
          Start Now
          <ArrowRight className="size-4" />
        </Link>
      ) : null}

      {mode === "attempted" && quizId ? (
        <div className="mt-4 flex gap-3">
          <Link
            href={`/quiz/${quizId}/report`}
            className="flex flex-1 items-center justify-center gap-1 rounded-[20px] border border-primary/10 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
          >
            Report
            <ChevronRight className="size-4" />
          </Link>
          {daysLeft > 0 ? (
            <Link
              href={`/quiz/${quizId}/attempt`}
              className="flex flex-1 items-center justify-center gap-1 rounded-[20px] border border-primary px-3 py-2 text-sm font-semibold text-primary"
            >
              Reattempt
              <ChevronRight className="size-4" />
            </Link>
          ) : null}
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {quiz.quizType === "mock" ? "Full syllabus mock" : "Weekly Quiz"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-secondary-text">
            {dateRange} • {totalQuestions} Quiz Questions
          </p>
          <div className="mt-2 space-y-3">
            {Object.entries(topics).map(([subject, names]) => {
              const tone = subjectTone(subject);
              return (
                <div key={subject} className={cn("rounded-2xl p-4", tone.bg)}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className={cn("text-base font-bold capitalize", tone.color)}>
                      {subject}
                    </p>
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold",
                        tone.color
                      )}
                    >
                      {names.length}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {names.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className={cn("size-1.5 rounded-full", tone.dot)} />
                        {capitalizeFirstLetter(topic)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default WeeklyQuizCard;
