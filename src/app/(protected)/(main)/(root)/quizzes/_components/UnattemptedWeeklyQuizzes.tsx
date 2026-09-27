import Image from "next/image";
import WeeklyQuizCard from "./WeeklyQuizCard";
import { WeeklyQuizProps } from "@/helpers/types";

const UnattemptedWeeklyQuizzes = ({
  quizzes,
}: {
  quizzes: WeeklyQuizProps[];
}) => {
  if (!quizzes?.length) {
    return (
      <div className="flex flex-col items-center px-6 py-16 text-center">
        <Image
          src="/assets/images/typing_laptop.png"
          alt=""
          width={160}
          height={160}
          className="h-40 w-40 object-contain"
        />
        <p className="mt-8 text-2xl font-semibold text-dark-primary">No Quizzes, yet!</p>
        <p className="mt-2 max-w-xs text-sm text-secondary-text">
          No Quizzes in your inbox, yet! Start your journey to create quizzes
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {quizzes.map((quiz) => (
        <WeeklyQuizCard key={quiz._id} quiz={quiz} mode="unattempted" />
      ))}
    </div>
  );
};

export default UnattemptedWeeklyQuizzes;
