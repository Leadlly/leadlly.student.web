import React from "react";
import AttemptedWeekQuiz from "./AttemptedWeekQuiz";
import { AttemptedWeeklyQuiz, Subject, WeeklyQuizProps } from "@/helpers/types";

type AttemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const AttemptedWeeklyQuizzes = ({ quizzes }: AttemptedWeeklyQuizzesProps) => {
  return (
    <div>
      <div className=" w-full  min-h-20 flex flex-col gap-4">
        {quizzes && quizzes.length ? (
          quizzes.map((quiz, index) => (
            <AttemptedWeekQuiz key={quiz._id} quiz={quiz} />
          ))
        ) : (
          <div className="text-center text-lg text-muted-foreground">
            <p>No attempted quiz yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptedWeeklyQuizzes;
