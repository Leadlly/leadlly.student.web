import { ErrorBookQuestion } from "@/helpers/types";
import { CircleCheckBig, CircleX } from "lucide-react";
import Image from "next/image";
import React from "react";

const ErroredQuestions = ({
  chapterErrorBook,
}: {
  chapterErrorBook: ErrorBookQuestion[];
}) => {
  console.log(chapterErrorBook);
  return (
    <section className="p-5 lg:p-10  ">
      <h2 className="text-2xl font-semibold mb-4 text-[#000000]">
        Errored Questions
      </h2>
      <div className="space-y-5 md:space-y-10 p-2 md:p-5">
        {chapterErrorBook?.map((solvedQuestion, index) => (
          <div key={index} className="flex flex-col gap-3">
            <p className="font-semibold text-[#7C7C7C] text-lg md:text-xl">{`Question ${index + 1}`}</p>

            <div
              className="font-semibold text-lg md:text-xl"
              dangerouslySetInnerHTML={{
                __html: solvedQuestion.question.question,
              }}
            ></div>
            {solvedQuestion.question.images.map((image, index) => {
              return (
                <Image
                  src={image.url}
                  alt="question image"
                  key={index}
                  width={300}
                  height={200}
                />
              );
            })}
            <ol
              className="grid pl-5 md:grid-cols-2 md:grid-rows-2"
              type="A"
              style={{ listStyleType: "upper-alpha" }}
            >
              {solvedQuestion.question.options?.map((option, optIndex) => (
                <li key={optIndex} className="pl-5 font-semibold">
                  <div dangerouslySetInnerHTML={{ __html: option.name }}></div>{" "}
                  {option?.images?.map((image, index) => {
                    return (
                      <Image
                        src={image.url}
                        alt="question image"
                        key={index}
                        width={300}
                        height={200}
                      />
                    );
                  })}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ErroredQuestions;
