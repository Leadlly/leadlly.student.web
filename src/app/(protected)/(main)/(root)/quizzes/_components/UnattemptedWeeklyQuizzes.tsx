import React from "react";
import Image from "next/image";
import UnattemptedWeekQuiz from "./UnattemptedWeekQuiz";
import { WeeklyQuizProps } from "@/helpers/types";

type UnattemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const UnattemptedWeeklyQuizzes = ({
  quizzes,
}: UnattemptedWeeklyQuizzesProps) => {
  return (
    <div>
      <div className=" w-full  min-h-20 flex flex-col gap-4">
        {quizzes && quizzes.length ? (
          quizzes.map((quiz, index) => (
            <UnattemptedWeekQuiz key={quiz._id} quiz={quiz} />
          ))
        ) : (
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <Image
              src="/assets/images/typing_laptop.png"
              alt=""
              width={160}
              height={160}
              className="h-40 w-40 object-contain"
            />
            <p className="mt-6 text-2xl font-semibold text-dark-primary">No Quizzes, yet!</p>
            <p className="mt-2 max-w-xs text-sm text-secondary-text">
              No Quizzes in your inbox, yet! Start your journey to create quizzes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnattemptedWeeklyQuizzes;
