"use client";
import React, { useState } from "react";
import AttemptedQuiz from "./AttemptedQuiz";
import { AttemptedQuizProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";

type AttemptedChapterWiseQuizzesProps = {
  quizzes: AttemptedQuizProps[];
};

const AttemptedChapterWiseQuizzes = ({
  quizzes,
}: AttemptedChapterWiseQuizzesProps) => {
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
      <div className="flex justify-around md:justify-start gap-2 md:pl-[10%] py-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`md:px-6 md:py-1 py-1 px-3 rounded-[7px] font-medium text-xs md:text-sm border-[2px] capitalize  ${
              selectedSubject === subject
                ? "border-[#575757]  bg-[#FBFBFB]"
                : "bg-[#F3F3F3] text-[#919191] border-transparent "
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
      <div className="\ flex-col w-full  min-h-20 flex gap-4 ">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz, index) => (
            <AttemptedQuiz key={quiz.id} quiz={quiz} />
          ))
        ) : (
          <div className="text-center w-full font-medium text-lg text-gray-500">
            No Quizzes
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptedChapterWiseQuizzes;
