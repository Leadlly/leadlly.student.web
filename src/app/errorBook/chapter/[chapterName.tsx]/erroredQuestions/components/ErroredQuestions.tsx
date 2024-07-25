import { CircleCheckBig, CircleX } from "lucide-react";
import React from "react";

const ErroredQuestions = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: [
        { answer: "Paris" },
        { answer: "London" },
        { answer: "Rome" },
        { answer: "Berlin" },
      ],
    },
    {
      question: "What is 2 + 2?",
      options: [
        { answer: "3" },
        { answer: "4" },
        { answer: "5" },
        { answer: "6" },
      ],
    },
    {
      question: "What is the capital of France?",
      options: [
        { answer: "Paris" },
        { answer: "London" },
        { answer: "Rome" },
        { answer: "Berlin" },
      ],
    },
    {
      question: "What is 2 + 2?",
      options: [
        { answer: "3" },
        { answer: "4" },
        { answer: "5" },
        { answer: "6" },
      ],
    },
  ];

  return (
    <section className=" md:p-5 lg:p-10  ">
      <h2 className="text-2xl font-semibold mb-4 text-[#000000]">
        Errored Questions
      </h2>
      <div className="space-y-5 md:space-y-10 p-2 md:p-5">
        {questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-3">
            <p className="font-semibold text-[#7C7C7C] text-lg md:text-xl">{`Question ${index + 1}`}</p>
            <p className="font-semibold text-lg md:text-xl">
              {question.question}
            </p>
            <ol
              className="grid grid-cols-2 grid-rows-2"
              type="A"
              style={{ listStyleType: "upper-alpha" }}
            >
              {question.options.map((option, optIndex) => (
                <li key={optIndex} className="pl-5 font-semibold">
                  <p>{option.answer}</p>
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
