import { TQuizQuestionProps } from "@/helpers/types";
import { sanitizedHtml } from "@/helpers/utils";
import React from "react";

const Question = ({ question }: { question: TQuizQuestionProps }) => {
  return (
    <div className="mb-4">
      <p className="text-xl mb-2">
        <span
          dangerouslySetInnerHTML={{
            __html: sanitizedHtml(question.question),
          }}
        />
      </p>
    </div>
  );
};

export default Question;
