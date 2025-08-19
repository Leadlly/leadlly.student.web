import { QuestionOption } from "@/helpers/types";
import Image from "next/image";
import React from "react";

interface OptionsProps {
  options: QuestionOption[];
  selectedOption: string | null;
  handleOptionChange: (answerId: string, questionId: string) => void;
  questionId: string;
}

const Options: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  handleOptionChange,
  questionId,
}) => {
  return (
    <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 gap-x-20 grid-flow-row">
      {options.map((option, index) => (
        <label
          key={index}
          className={`border-2 p-4 focus-within:border-blue-500 border-[#E3E3E3] rounded-[6px] flex justify-start items-center gap-3 ${option._id === selectedOption ? "border-blue-500" : ""}`}
        >
          <input
            type="radio"
            className="form-radio"
            name="option"
            value={index + 1}
            checked={option._id === selectedOption}
            onChange={() => handleOptionChange(option._id, questionId)}
          />
          <div dangerouslySetInnerHTML={{ __html: option.name }}></div>{" "}
          {option.images?.map((image, index) => {
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
        </label>
      ))}
    </div>
  );
};

export default Options;
