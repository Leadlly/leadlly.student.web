import { EQuestion } from '@/helpers/types';
import Image from 'next/image';
import React from 'react';

interface QuestionProps {
	question: EQuestion
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
            src={image.url}
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
