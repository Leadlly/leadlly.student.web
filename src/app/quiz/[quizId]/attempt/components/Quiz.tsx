'use client';
import { useEffect, useState } from 'react';
import Question from './Question';
import Options from './Options';
import Pagination from './Pagination';
import SubmitDialog from './SubmitDialog';

interface QuestionType {
	question: string;
	options: string[];
	correctAnswer: number;
}

const questions: QuestionType[] = [
	{ question: 'What is 2 + 2?', options: ['1', '2', '3', '4'], correctAnswer: 3 },
	{
		question: 'What is the capital of France?',
		options: ['Berlin', 'London', 'Paris', 'Rome'],
		correctAnswer: 2,
	},
	{ question: 'What is 3 + 5?', options: ['5', '8', '10', '12'], correctAnswer: 1 },
	{
		question: 'What is the largest planet?',
		options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
		correctAnswer: 2,
	},
	{
		question: 'What is the smallest prime number?',
		options: ['1', '2', '3', '4'],
		correctAnswer: 1,
	},
	{
		question: "Who wrote 'To Kill a Mockingbird'?",
		options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'],
		correctAnswer: 0,
	},
	{
		question: 'What is the speed of light?',
		options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
		correctAnswer: 0,
	},
	{
		question: 'Which planet is closest to the sun?',
		options: ['Earth', 'Mars', 'Mercury', 'Venus'],
		correctAnswer: 2,
	},
	{
		question: 'What is the capital of Japan?',
		options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
		correctAnswer: 2,
	},
	{ question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
	{
		question: 'Who painted the Mona Lisa?',
		options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
		correctAnswer: 1,
	},
	{
		question: 'What is the chemical symbol for water?',
		options: ['H2O', 'O2', 'CO2', 'NaCl'],
		correctAnswer: 0,
	},
	{
		question: 'What is the tallest mountain in the world?',
		options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
		correctAnswer: 2,
	},
	{
		question: "Who is the author of 'Harry Potter'?",
		options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'C.S. Lewis'],
		correctAnswer: 1,
	},
	{
		question: 'What is the largest ocean on Earth?',
		options: ['Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Pacific Ocean'],
		correctAnswer: 3,
	},
	{
		question: 'What is the tallest building in the world?',
		options: [
			'Burj Khalifa',
			'Shanghai Tower',
			'Abraj Al-Bait Clock Tower',
			'Ping An Finance Centre',
		],
		correctAnswer: 0,
	},
	{
		question: 'What is the smallest country in the world?',
		options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
		correctAnswer: 0,
	},
	{
		question: 'What is the most spoken language in the world?',
		options: ['English', 'Mandarin Chinese', 'Spanish', 'Hindi'],
		correctAnswer: 1,
	},
	{
		question: 'What is the longest river in the world?',
		options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
		correctAnswer: 0,
	},
	{
		question: 'What is the longest river in the world?',
		options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
		correctAnswer: 0,
	},
	{ question: 'What is 2 + 2?', options: ['1', '2', '3', '4'], correctAnswer: 3 },
	{
		question: 'What is the capital of France?',
		options: ['Berlin', 'London', 'Paris', 'Rome'],
		correctAnswer: 2,
	},
	{ question: 'What is 3 + 5?', options: ['5', '8', '10', '12'], correctAnswer: 1 },
	{
		question: 'What is the largest planet?',
		options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
		correctAnswer: 2,
	},
	{
		question: 'What is the smallest prime number?',
		options: ['1', '2', '3', '4'],
		correctAnswer: 1,
	},
	{
		question: "Who wrote 'To Kill a Mockingbird'?",
		options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'],
		correctAnswer: 0,
	},
	{
		question: 'What is the speed of light?',
		options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
		correctAnswer: 0,
	},
	{
		question: 'Which planet is closest to the sun?',
		options: ['Earth', 'Mars', 'Mercury', 'Venus'],
		correctAnswer: 2,
	},
	{
		question: 'What is the capital of Japan?',
		options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
		correctAnswer: 2,
	},
	{ question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
	{
		question: 'Who painted the Mona Lisa?',
		options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
		correctAnswer: 1,
	},
	{
		question: 'What is the chemical symbol for water?',
		options: ['H2O', 'O2', 'CO2', 'NaCl'],
		correctAnswer: 0,
	},
	{
		question: 'What is the tallest mountain in the world?',
		options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
		correctAnswer: 2,
	},
	{
		question: "Who is the author of 'Harry Potter'?",
		options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'C.S. Lewis'],
		correctAnswer: 1,
	},
	{
		question: 'What is the largest ocean on Earth?',
		options: ['Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Pacific Ocean'],
		correctAnswer: 3,
	},
	{
		question: 'What is the tallest building in the world?',
		options: [
			'Burj Khalifa',
			'Shanghai Tower',
			'Abraj Al-Bait Clock Tower',
			'Ping An Finance Centre',
		],
		correctAnswer: 0,
	},
	{
		question: 'What is the smallest country in the world?',
		options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
		correctAnswer: 0,
	},
	{
		question: 'What is the most spoken language in the world?',
		options: ['English', 'Mandarin Chinese', 'Spanish', 'Hindi'],
		correctAnswer: 1,
	},
	{
		question: 'What is the longest river in the world?',
		options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
		correctAnswer: 0,
	},
	{
		question: 'What is the longest river in the world?',
		options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
		correctAnswer: 0,
	},
	{ question: 'What is 2 + 2?', options: ['1', '2', '3', '4'], correctAnswer: 3 },
	{
		question: 'What is the capital of France?',
		options: ['Berlin', 'London', 'Paris', 'Rome'],
		correctAnswer: 2,
	},
	{ question: 'What is 3 + 5?', options: ['5', '8', '10', '12'], correctAnswer: 1 },
	{
		question: 'What is the largest planet?',
		options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
		correctAnswer: 2,
	},
	{
		question: 'What is the smallest prime number?',
		options: ['1', '2', '3', '4'],
		correctAnswer: 1,
	},
	{
		question: "Who wrote 'To Kill a Mockingbird'?",
		options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'],
		correctAnswer: 0,
	},
	{
		question: 'What is the speed of light?',
		options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
		correctAnswer: 0,
	},
	{
		question: 'Which planet is closest to the sun?',
		options: ['Earth', 'Mars', 'Mercury', 'Venus'],
		correctAnswer: 2,
	},
	{
		question: 'What is the capital of Japan?',
		options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
		correctAnswer: 2,
	},
	{ question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
	{
		question: 'Who painted the Mona Lisa?',
		options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
		correctAnswer: 1,
	},
	{
		question: 'What is the chemical symbol for water?',
		options: ['H2O', 'O2', 'CO2', 'NaCl'],
		correctAnswer: 0,
	},
	{
		question: 'What is the tallest mountain in the world?',
		options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
		correctAnswer: 2,
	},
	{
		question: "Who is the author of 'Harry Potter'?",
		options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'C.S. Lewis'],
		correctAnswer: 1,
	},
	{
		question: 'What is the largest ocean on Earth?',
		options: ['Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Pacific Ocean'],
		correctAnswer: 3,
	},
	{
		question: 'What is the tallest building in the world?',
		options: [
			'Burj Khalifa',
			'Shanghai Tower',
			'Abraj Al-Bait Clock Tower',
			'Ping An Finance Centre',
		],
		correctAnswer: 0,
	},
	{
		question: 'What is the smallest country in the world?',
		options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
		correctAnswer: 0,
	},
	{
		question: 'What is the most spoken language in the world?',
		options: ['English', 'Mandarin Chinese', 'Spanish', 'Hindi'],
		correctAnswer: 1,
	},
	{
		question: 'What is the longest river in the world?',
		options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
		correctAnswer: 0,
	},
	{
		question: 'What is the longest river in the world?',
		options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
		correctAnswer: 0,
	},
	// Add more questions to make it at least 30
];

const Quiz = ({quizId}:{quizId:string}) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState<(0 | 1 | 2 | 3 | 4)[]>(
		Array(questions.length).fill(0)
	);

	const handleOptionChange = (index: number, questionNumber: number) => {
		setAnsweredQuestions((prev) => {
			const newPrev = [...prev];
			if (index in [0, 1, 2, 3, 4]) newPrev[questionNumber] = index as 0 | 1 | 3 | 2 | 4;
			return newPrev;
		});
	};

	const handleNextQuestion = () => {
		setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
	};
	const handlePrevQuestion = () => {
		setCurrentQuestion((prev) => Math.max(prev - 1, 0));
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentQuestion(pageNumber);
	};
	useEffect(() => {
		setSelectedOption(answeredQuestions[currentQuestion]);
	}, [currentQuestion,answeredQuestions]);
	return (
		<>
			<div className='flex flex-col justify-center gap-7 items-center px-5'>
				<div className='w-full flex flex-col justify-center items-center gap-4'>
					<h1 className='text-4xl font-semibold '>Weekly Quiz</h1>
					<h2 className='text-[#737373] text-2xl'>(Jan 05 - Jan 11) </h2>
				</div>
				<div className='bg-[#9654F42E] rounded-[10px] p-4 w-full flex justify-between items-center'>
					<span className='font-semibold text-[#636363] text-2xl'>
						Answered:{' '}
						<span className='text-[#9654F4]'>{answeredQuestions.filter(Boolean).length}</span>/
						{questions.length}
					</span>
					<SubmitDialog quizId={quizId}/>
				</div>
				<Pagination
					totalQuestions={questions.length}
					currentQuestion={currentQuestion}
					onPageChange={handlePageChange}
					answeredQuestions={answeredQuestions}
				/>
				<div className='w-full border-2 border-[#CFCFCF]  rounded-[10px]'>
					<div className='p-7'>
						<h4 className='text-[#7C7C7C] font-medium text-xl'>Question {currentQuestion + 1} :</h4>
						<div className='p-5'>
							<Question question={questions[currentQuestion]} />
							<Options
								options={questions[currentQuestion].options}
								selectedOption={selectedOption}
								handleOptionChange={handleOptionChange}
								questionNumber={currentQuestion}
							/>
						</div>
					</div>
					<div className='bg-[#9654F40F] flex justify-center items-center gap-20 py-3'>
						<button
							className=' bg-white border border-[#C0C0C0] px-4 py-1 font-semibold  rounded-md'
							onClick={handlePrevQuestion}
						>
							Prev
						</button>
						<button
							className=' bg-[#9654F4] text-white border border-transparent px-4 py-1 font-semibold  rounded-md'
							onClick={handleNextQuestion}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Quiz;
