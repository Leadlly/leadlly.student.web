import React from 'react';
import AttemptedWeekQuiz from './AttemptedWeekQuiz';
import { AttemptedWeeklyQuiz, Subject } from '@/helpers/types';


type AttemptedWeeklyQuizzesProps = {
	quizzes: AttemptedWeeklyQuiz[];
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
