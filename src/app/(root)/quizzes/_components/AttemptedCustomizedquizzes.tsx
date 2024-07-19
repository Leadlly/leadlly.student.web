"use client";
import React, { useState } from "react";
import AttemptedQuiz from "./AttemptedQuiz";
import { AttemptedQuizProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";

type AttemptedCustomizedQuizzesProps = {
  quizzes: AttemptedQuizProps[];
};

const AttemptedCustomizedQuizzes = ({
  quizzes,
}: AttemptedCustomizedQuizzesProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");

  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );
  const subjects = ["All", ...userSubjects?.map((subject) => subject.name)!];

  const filteredQuizzes =
    selectedSubject === "All"
      ? quizzes
      : quizzes.filter((quiz) => quiz.subject === selectedSubject);

  return (
    <div>
      <div className=" w-full  min-h-20 flex flex-col gap-4">
        {quizzes && quizzes.length ? (
          quizzes.map((quiz, index) => (
            <AttemptedQuiz key={quiz.id} quiz={quiz} />
          ))
        ) : (
          <div className="text-lg text-center text-muted-foreground">
            <p>No customized attempted quiz yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptedCustomizedQuizzes;
