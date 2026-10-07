"use client";

import { useState } from "react";
import Image from "next/image";
import AttemptedQuiz from "./AttemptedQuiz";
import { AttemptedQuizProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";

const AttemptedChapterWiseQuizzes = ({
  quizzes,
}: {
  quizzes: AttemptedQuizProps[];
}) => {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const userSubjects = useAppSelector((state) => state.user.user?.academic?.subjects);
  const subjects = ["All", ...(userSubjects?.map((subject) => subject.name) ?? [])];
  const list = Array.isArray(quizzes) ? quizzes : [];
  const filteredQuizzes =
    selectedSubject === "All"
      ? list
      : list.filter((quiz) => quiz.subject === selectedSubject);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            type="button"
            onClick={() => setSelectedSubject(subject)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold capitalize",
              selectedSubject === subject
                ? "bg-primary/10 text-primary"
                : "bg-[#F4F1FB] text-secondary-text"
            )}
          >
            {subject}
          </button>
        ))}
      </div>
      {filteredQuizzes.length ? (
        <div className="flex flex-col gap-3">
          {filteredQuizzes.map((quiz) => (
            <AttemptedQuiz key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <Image
            src="/assets/images/typing_laptop.png"
            alt=""
            width={160}
            height={160}
            className="h-40 w-40 object-contain"
          />
          <p className="mt-8 text-2xl font-semibold text-dark-primary">
            No Attempted Chapter Quizzes, yet!
          </p>
          <p className="mt-2 max-w-xs text-sm text-secondary-text">
            No Quizzes in your inbox, yet! Start your journey to create quizzes
          </p>
        </div>
      )}
    </div>
  );
};

export default AttemptedChapterWiseQuizzes;
