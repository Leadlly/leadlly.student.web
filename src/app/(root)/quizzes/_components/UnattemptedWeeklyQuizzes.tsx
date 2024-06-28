import React from 'react';
import UnattemptedWeekQuiz from './UnattemptedWeekQuiz';

type Subject = {
	name: string;
	color: string;
};

type WeeklyQuiz = {
	id: number;
	description: string;
	startDate: string;
	endDate: string;
	subjects: Subject[];
	questions: number;
};

type UnattemptedWeeklyQuizzesProps = {
	quizzes: WeeklyQuiz[];
};

const UnattemptedWeeklyQuizzes = ({ quizzes }: UnattemptedWeeklyQuizzesProps) => {
	return (
		<div >
			
			<div className=' w-full  min-h-20 flex flex-col gap-4'>
				{quizzes.map((quiz, index) => (
					<UnattemptedWeekQuiz
						key={quiz.id}
						quiz={quiz}
					/>
				))}
			</div>
		</div>
	);
};

export default UnattemptedWeeklyQuizzes;
