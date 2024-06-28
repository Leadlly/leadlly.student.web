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
	date: string;
	efficiency: number;
}

type AttemptedChapterWiseQuizzesProps = {
	quizzes: ChapterQuiz[];
};

const AttemptedChapterWiseQuizzes = ({ quizzes }: AttemptedChapterWiseQuizzesProps) => {
	const [selectedSubject, setSelectedSubject] = useState<string>('All');

	const subjects = ['All', 'Maths', 'Physics', 'Chemistry'];

	const filteredQuizzes =
		selectedSubject === 'All'
			? quizzes
			: quizzes.filter((quiz) => quiz.subject.name === selectedSubject);

	return (
		<div >
			
			<div className='flex  justify-start gap-2 pl-[10%] py-2'>
				{subjects.map((subject) => (
					<button
						key={subject}
						onClick={() => setSelectedSubject(subject)}
						className={`px-6 py-1 rounded-[7px] font-medium text-sm border-[2px]  ${
							selectedSubject === subject
								? 'border-[#575757]  bg-[#FBFBFB]'
								: 'bg-[#F3F3F3] text-[#919191] border-transparent '
						}`}
					>
						{subject}
					</button>
				))}
			</div>
			<div className='\ flex-col w-full  min-h-20 flex gap-4 '>
				{filteredQuizzes.length > 0 ? (
					filteredQuizzes.map((quiz, index) => (
						<AttemptedQuiz
							key={quiz.id}
							quiz={quiz}
						/>
					))
				) : (
					<div className='text-center w-full font-medium text-lg text-gray-500'>No Quizzes</div>
				)}
			</div>
		</div>
	);
};

export default AttemptedChapterWiseQuizzes;
