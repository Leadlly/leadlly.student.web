import React from 'react';
import UnattemptedWeekQuiz from './UnattemptedWeekQuiz';
import { Subject, UnattemptedWeeklyQuiz } from '@/helpers/types';


type UnattemptedWeeklyQuizzesProps = {
	quizzes: UnattemptedWeeklyQuiz[];
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
