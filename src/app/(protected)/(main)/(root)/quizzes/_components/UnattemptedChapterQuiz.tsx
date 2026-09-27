import { Button } from "@/components/ui/button";
import { UnattemptedChapterQuizProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const subjectChip = (subject: string) => {
  const name = subject.toLowerCase();
  if (name === "maths" || name === "biology") return "bg-[#107FFC30]";
  if (name === "physics") return "bg-[#A36AF53D]";
  if (name === "chemistry") return "bg-[#72EFDD4A]";
  return "bg-primary/10";
};

const UnattemptedChapterQuiz = ({ quiz }: { quiz: UnattemptedChapterQuizProps }) => {
  return (
    <article className="rounded-3xl border border-[#E6E1F0] p-4">
      <h3 className="text-base font-semibold text-dark-primary">{quiz.chapterName}</h3>
      <div className="mt-2 flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-secondary-text">{quiz.description}</p>
          <span
            className={cn(
              "mt-4 inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize text-black",
              subjectChip(quiz.subject)
            )}
          >
            {quiz.subject}
          </span>
        </div>
        <div className="text-right">
          <p className="mb-2 text-xs text-secondary-text">{quiz.questions} Quiz Questions</p>
          <Link href={`/quiz/${quiz.id}/attempt`}>
            <Button className="h-8 rounded-md px-3 text-xs font-semibold">Attempt Now</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default UnattemptedChapterQuiz;
