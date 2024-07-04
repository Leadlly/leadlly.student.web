'use client';
import React, { useState } from 'react';
import AttemptedQuiz from './AttemptedQuiz';

type Subject = {
	name: string;
	color: string;
};

interface ChapterQuiz {
	id: number;
	chapterName: string;
	description: string;
	subject: Subject;
	questions: number;
	completedDate: string;
	efficiency: number;
}

type AttemptedCustomizedQuizzesProps = {
	quizzes: ChapterQuiz[];
};

const AttemptedCustomizedQuizzes = ({ quizzes }: AttemptedCustomizedQuizzesProps) => {
	const [selectedSubject, setSelectedSubject] = useState<string>('All');

	const subjects = ['All', 'Maths', 'Physics', 'Chemistry'];

	const filteredQuizzes =
		selectedSubject === 'All'
			? quizzes
			: quizzes.filter((quiz) => quiz.subject.name === selectedSubject);

	return (
		<div>
			<div className=' w-full  min-h-20 flex flex-col gap-4'>
				{quizzes.map((quiz, index) => (
					<AttemptedQuiz
						key={quiz.id}
						quiz={quiz}
					/>
				))}
			</div>
		</div>
	);
};

export default AttemptedCustomizedQuizzes;
