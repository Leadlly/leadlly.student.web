import React from 'react';

interface QuestionProps {
	question: {
		question: string;
		options: string[];
	};
}

const Question: React.FC<QuestionProps> = ({ question }) => {
	return (
		<div className='mb-4'>
			<p className='text-xl mb-2'>{question.question}</p>
		</div>
	);
};

export default Question;
