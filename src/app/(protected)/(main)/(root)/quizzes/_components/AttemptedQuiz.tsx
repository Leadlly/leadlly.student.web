import { AttemptedQuizProps } from "@/helpers/types";
import { formatDate } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const subjectChip = (subject?: string | null) => {
  const name = String(subject || "").toLowerCase();
  if (name === "maths" || name === "biology") return "bg-[#107FFC30]";
  if (name === "physics") return "bg-[#A36AF53D]";
  if (name === "chemistry") return "bg-[#72EFDD4A]";
  return "bg-primary/10";
};

const AttemptedQuiz = ({ quiz }: { quiz: AttemptedQuizProps }) => {
  const quizId = quiz?.id != null ? String(quiz.id) : "";
  const subject = quiz?.subject ? String(quiz.subject) : "General";
  const completed = quiz?.completedDate ? new Date(quiz.completedDate) : null;

  return (
    <article className="rounded-3xl border border-[#E6E1F0] p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-dark-primary">
          {quiz?.chapterName || "Chapter quiz"}
        </h3>
        {completed && !Number.isNaN(completed.getTime()) ? (
          <p className="text-sm text-secondary-text">{formatDate(completed)}</p>
        ) : null}
      </div>
      <div className="mt-2 flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-secondary-text">{quiz?.description || ""}</p>
          <span
            className={cn(
              "mt-4 inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize text-black",
              subjectChip(subject)
            )}
          >
            {subject}
          </span>
        </div>
        <div className="text-right">
          <p className="mb-2 text-xs text-secondary-text">
            {quiz?.questions ?? 0} Quiz Questions
          </p>
          {quizId ? (
            <Link
              href={`/quiz/${quizId}/report`}
              className="inline-flex items-center rounded-md border border-[#E6E1F0] bg-white px-2 py-1 text-xs font-semibold"
            >
              View Details
              <ChevronRight className="size-3" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default AttemptedQuiz;
