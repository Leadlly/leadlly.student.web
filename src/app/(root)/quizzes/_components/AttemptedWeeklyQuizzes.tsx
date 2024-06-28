import React from 'react';
import AttemptedWeekQuiz from './AttemptedWeekQuiz';

type Subject = {
	name: string;
	color: string;
};

interface WeeklyQuiz {
	id: number;
	description: string;
	startDate: string;
	endDate: string;
	subject: Subject;
	completedDate: string;
	efficiency: number;
	questions: number;
}
type AttemptedWeeklyQuizzesProps = {
	quizzes: WeeklyQuiz[];
};

const AttemptedWeeklyQuizzes = ({ quizzes }: AttemptedWeeklyQuizzesProps) => {
	return (
		<div>
			<div className=' w-full  min-h-20 flex flex-col gap-4'>
				{quizzes.map((quiz, index) => (
					<AttemptedWeekQuiz
						key={quiz.id}
						quiz={quiz}
					/>
				))}
			</div>
		</div>
	);
};

export default AttemptedWeeklyQuizzes;
