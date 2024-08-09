import Image from 'next/image';
import React from 'react';
interface OptionType {
  name: string;
  tag: string;
  images: string | null;
  _id: string;
}

interface QuestionType {
  _id: string;
  question: string;
  options: OptionType[];
  standard: number;
  subject: string;
  chapter: string[];
  topics: string[];
  subtopics: string[];
  level: string;
  images: string[];
  createdBy: string;
  createdAt: string;
  __v: number;
}
interface QuestionProps {
	question: QuestionType
}

const Question: React.FC<QuestionProps> = ({ question }) => {
	return (
    <div className="mb-4">
      <div
        className="font-semibold text-lg md:text-xl  mb-2"
        dangerouslySetInnerHTML={{
          __html: question.question,
        }}
      ></div>
      {question.images.map((image, index) => {
        return (
          <Image
            src={image}
            alt="question image"
            key={index}
            width={300}
            height={200}
          />
        );
      })}
    </div>
  );
};

export default Question;
