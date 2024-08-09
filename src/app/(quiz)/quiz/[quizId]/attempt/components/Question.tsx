import { TQuizQuestionProps } from "@/helpers/types";
import { sanitizedHtml } from "@/helpers/utils";
import Image from "next/image";
import React from "react";

const Question = ({ question }: { question: TQuizQuestionProps }) => {
  return (
    <div className="mb-4">
      <p className="text-xl mb-2">
        <span
          dangerouslySetInnerHTML={{
            __html: sanitizedHtml(question?.question),
          }}
        />
      </p>
      {question?.images && question?.images.length > 0 ? (
        <Image
          src={
            question.images &&
            question.images.length > 0 &&
            question.images?.[0].url
              ? question.images?.[0].url
              : ""
          }
          alt={question?.topics[0]}
          width={500}
          height={300}
        />
      ) : null}
    </div>
  );
};

export default Question;
