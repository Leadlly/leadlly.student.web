import React from "react";
import UnattemptedWeekQuiz from "./UnattemptedWeekQuiz";
import { Subject, WeeklyQuizProps } from "@/helpers/types";

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
          <div className="text-center text-lg text-muted-foreground">
            <p>No quiz yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnattemptedWeeklyQuizzes;
