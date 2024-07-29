import React from "react";
import UnattemptedWeekQuiz from "./UnattemptedWeekQuiz";
import { Subject, UnattemptedWeeklyQuiz } from "@/helpers/types";

// type UnattemptedWeeklyQuizzesProps = {
//   quizzes: UnattemptedWeeklyQuiz[];
// };

const UnattemptedWeeklyQuizzes = ({
  weeklyQuizzes,
}: {
  weeklyQuizzes: UnattemptedWeeklyQuiz;
}) => {
  return (
    <div>
      <div className=" w-full  min-h-20 flex flex-col gap-4">
        {/* {quizzes && quizzes.length ? (
          quizzes.map((quiz, index) => ( */}
        <UnattemptedWeekQuiz quiz={weeklyQuizzes} />
        {/* ))
        ) : (
          <div className="text-center text-lg text-muted-foreground">
            <p>No quiz yet!</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UnattemptedWeeklyQuizzes;
