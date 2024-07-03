'use client';
import React, { useMemo, useState } from 'react';
import UnattemptedChapterQuiz from './UnattemptedChapterQuiz';

type Subject = {
	name: string;
	color: string;
};
type ChapterQuiz = {
	id: number;
	chapterName: string;
	description: string;
	subject: Subject;
	questions: number;
};

type UnattemptedChapterWiseQuizzesProps = {
	quizzes: ChapterQuiz[];
};

const UnattemptedChapterWiseQuizzes = ({ quizzes }: UnattemptedChapterWiseQuizzesProps) => {
	const [selectedSubject, setSelectedSubject] = useState<string>('All');

	const subjects = ['All', 'Maths', 'Physics', 'Chemistry'];

	const filteredQuizzes = useMemo(() => {
		return selectedSubject === 'All'
			? quizzes
			: quizzes.filter((quiz) => quiz.subject.name === selectedSubject);
	}, [selectedSubject,quizzes]);

	return (
		<div>
			<div className='flex justify-around md:justify-start gap-2 md:pl-[10%] py-2'>
				{subjects.map((subject) => (
					<button
						key={subject}
						onClick={() => setSelectedSubject(subject)}
						className={`md:px-6 md:py-1 py-1 px-3 rounded-[7px] font-medium text-xs md:text-sm border-[2px]  ${
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
						<UnattemptedChapterQuiz
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

export default UnattemptedChapterWiseQuizzes;
