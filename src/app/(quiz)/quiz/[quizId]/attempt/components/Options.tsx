import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TQuizAnswerProps, TQuizQuestionOptionsProps } from "@/helpers/types";
import { sanitizedHtml } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface OptionsProps {
  options: TQuizQuestionOptionsProps[];
  selectedOption: TQuizQuestionOptionsProps | null;
  handleOptionChange: (option: TQuizQuestionOptionsProps) => void;
  attemptedOption?: {
    questionId: string;
    quizId: string;
    topic: { name: string };
    question: TQuizAnswerProps;
  };
}

const Options: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  handleOptionChange,
  attemptedOption,
}) => {
  return (
    <RadioGroup className="grid sm:grid-cols-2 gap-2 sm:gap-4 gap-x-20 grid-flow-row">
      {options?.map((option) => (
        <div
          key={option._id}
          className={cn(
            "flex items-center gap-5 border-2 p-4 rounded-lg cursor-pointer",
            (selectedOption?.name === option.name ||
              (attemptedOption &&
                attemptedOption.question.studentAnswer === option.name)) &&
              "border-primary"
          )}
          onClick={() => handleOptionChange(option)}
        >
          <div className="size-4">
            <RadioGroupItem
              value={option.name}
              id={option._id}
              checked={selectedOption?.name === option.name}
              onChange={() => handleOptionChange(option)}
            />
          </div>
          <Label
            htmlFor={option._id}
            className="text-base cursor-pointer flex-1 mt-1"
            dangerouslySetInnerHTML={{
              __html: sanitizedHtml(option.name),
            }}
          >
            {option.images ? (
              <Image
                src={option.images}
                alt="question image"
                key={option._id}
                width={300}
                height={200}
              />
            ) : null}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default Options;
