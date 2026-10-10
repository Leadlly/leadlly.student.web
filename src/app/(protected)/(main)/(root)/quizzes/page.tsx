import Link from "next/link";
import { cn } from "@/lib/utils";
import Unattempted from "./_components/Unattempted";
import Attempted from "./_components/Attempted";
import { getWeeklyQuiz, getChapterQuizzes } from "@/actions/weekly_quiz_actions";
import {
  AttemptedQuizProps,
  UnattemptedChapterQuizProps,
} from "@/helpers/types";

const quizPageTabs = [
  { title: "Unattempted", id: "unattempted" },
  { title: "Attempted", id: "attempted" },
];

const Quizzes = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const activeQuizTab = searchParams["tab"] ?? "unattempted";

  const emptyWeekly = { success: true, weeklyQuiz: [] as [] };
  const emptyChapters = { success: true as const, chapterQuizzes: [] };
  const [unattemptedQuiz, attemptedQuiz, unattemptedChapters, attemptedChapters] =
    await Promise.all([
      getWeeklyQuiz("unattempted").catch(() => emptyWeekly),
      getWeeklyQuiz("attempted").catch(() => emptyWeekly),
      getChapterQuizzes("unattempted").catch(() => emptyChapters),
      getChapterQuizzes("attempted").catch(() => emptyChapters),
    ]);

  return (
    <div className="flex flex-col gap-6 md:h-full">
      <h1 className="text-2xl font-semibold text-dark-primary md:text-3xl">Quizzes</h1>

      <ul className="flex w-full items-center rounded-full border border-[#E4DFF0] bg-white p-1.5">
        {quizPageTabs.map((tab) => {
          const active = activeQuizTab === tab.id;
          return (
            <li key={tab.id} className="flex-1">
              <Link
                href={`/quizzes?tab=${tab.id}`}
                className={cn(
                  "flex h-11 items-center justify-center rounded-full text-base font-semibold capitalize",
                  active ? "bg-primary/10 text-primary" : "text-black"
                )}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="rounded-[34px] bg-white md:min-h-0 md:flex-1 md:overflow-hidden">
        {activeQuizTab === "unattempted" && (
          <Unattempted
            weeklyQuizzes={unattemptedQuiz?.weeklyQuiz ?? []}
            chapterQuizzes={
              (unattemptedChapters?.chapterQuizzes ??
                []) as UnattemptedChapterQuizProps[]
            }
          />
        )}
        {activeQuizTab === "attempted" && (
          <Attempted
            weeklyQuizzes={attemptedQuiz?.weeklyQuiz ?? []}
            chapterQuizzes={
              (attemptedChapters?.chapterQuizzes ?? []) as AttemptedQuizProps[]
            }
          />
        )}
      </div>
    </div>
  );
};

export default Quizzes;
