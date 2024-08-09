import { CircleCheckBig, CircleX } from "lucide-react";
import React from "react";

const SolutionAnalysis = () => {
  const solutions = [
    {
      question: "What is the capital of France?",
      options: [
        { answer: "Paris" },
        { answer: "London" },
        { answer: "Rome" },
        { answer: "Berlin" },
      ],
      selected: 1,
      correct: 0,
    },
    {
      question: "What is 2 + 2?",
      options: [
        { answer: "3" },
        { answer: "4" },
        { answer: "5" },
        { answer: "6" },
      ],
      selected: 2,
      correct: 1,
    },
    {
      question: "What is the capital of France?",
      options: [
        { answer: "Paris" },
        { answer: "London" },
        { answer: "Rome" },
        { answer: "Berlin" },
      ],
      selected: 1,
      correct: 1,
    },
    {
      question: "What is 2 + 2?",
      options: [
        { answer: "3" },
        { answer: "4" },
        { answer: "5" },
        { answer: "6" },
      ],
      selected: 1,
      correct: 1,
    },
  ];

  return (
    <section className="shadow-section my-5 rounded-[10px] flex-1 p-6 md:p-10 lg:p-20 mx-5 md:mx-10 lg:mx-20">
      <h2 className="text-2xl font-semibold mb-4 text-[#9E9E9E]">
        Solution Analysis
      </h2>
      <div className="space-y-5 md:space-y-10 p-2 md:p-5">
        {solutions.map((solution, index) => (
          <div key={index} className="flex flex-col gap-3">
            <p className="font-semibold text-[#7C7C7C] text-lg md:text-xl">{`Question ${index + 1}`}</p>
            <p className="font-semibold text-lg md:text-xl">
              {solution.question}
            </p>
            {solution.options.map((option, optIndex) => (
              <div
                key={optIndex}
                className={`p-4 md:p-7 relative font-medium max-w-[600px] flex justify-between mb-2 rounded-[6px] border ${
                  optIndex === solution.correct
                    ? "border-green-500 bg-green-100"
                    : solution.selected === optIndex
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300 bg-gray-50"
                }`}
              >
                <p>{option.answer}</p>
                {(solution.selected === optIndex ||
                  solution.correct === optIndex) && (
                  <p
                    className={
                      optIndex === solution.correct
                        ? "text-green-400"
                        : "text-red-600"
                    }
                  >
                    {optIndex === solution.correct
                      ? "Correct answer"
                      : "Wrong answer"}
                  </p>
                )}{" "}
                {optIndex === solution.selected ? (
                  solution.selected !== solution.correct ? (
                    <CircleX className="size-5 absolute -top-[10px] right-[5%] fill-red-600 stroke-white bg-transparent" />
                  ) : solution.selected === solution.correct ? (
                    <CircleCheckBig className="size-5 absolute -top-[9px] right-[5%] fill-green-600 stroke-green-300" />
                  ) : null
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionAnalysis;
