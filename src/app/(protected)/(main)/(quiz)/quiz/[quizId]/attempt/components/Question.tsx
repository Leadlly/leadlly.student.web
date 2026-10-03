import { TQuizQuestionProps } from "@/helpers/types";
import { sanitizedHtml } from "@/helpers/utils";
import Image from "next/image";
import React from "react";

const Question = ({ question }: { question: TQuizQuestionProps }) => {
  const imageUrl = question?.images?.[0]?.url;
  const altText =
    (Array.isArray(question?.topics) && question.topics[0]) ||
    question?.subject ||
    "Question image";

  return (
    <div className="mb-4">
      <p className="text-xl mb-2">
        <span
          dangerouslySetInnerHTML={{
            __html: sanitizedHtml(question?.question || ""),
          }}
        />
      </p>
      {imageUrl ? (
        <Image src={imageUrl} alt={String(altText)} width={500} height={300} />
      ) : null}
    </div>
  );
};

export default Question;
