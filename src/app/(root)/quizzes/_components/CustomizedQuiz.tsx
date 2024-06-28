import React, { useState } from 'react';
import CustomInput from './CustomInput';
import Image from 'next/image';
import icon from '../../../../../public/assets/images/customizequiz.png';

const subjects = ['Math', 'Science'];
const chapters = {
	Math: ['Algebra', 'Geometry'],
	Science: ['Physics', 'Chemistry'],
};
const topics = {
	Algebra: ['Linear Equations', 'Quadratic Equations'],
	Geometry: ['Triangles', 'Circles'],
	Physics: ['Kinematics', 'Dynamics'],
	Chemistry: ['Organic Chemistry', 'Inorganic Chemistry'],
};

const CustomizedQuiz: React.FC = () => {
	const [subjectName, setSubjectName] = useState<string>('');
	const [chapterName, setChapterName] = useState<string>('');
	const [topicName, setTopicName] = useState<string>('');
	const [numberOfQuestions, setNumberOfQuestions] = useState<string>('');
	const [difficulty, setDifficulty] = useState<string>('');

	const handleCreateNow = () => {
		// Logic for creating the quiz
		console.log({
			subjectName,
			chapterName,
			topicName,
			numberOfQuestions,
			difficulty,
		});
	};

	const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSubjectName(e.target.value);
		setChapterName('');
		setTopicName('');
	};

	const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setChapterName(e.target.value);
		setTopicName('');
	};

	return (
		<div className='flex flex-col items-center gap-3 p-4 border border-gray-300 rounded-lg bg-[#F4EBFF] w-72'>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-medium'>Customized Quiz</h1>
				<h1 className='text-[#9654F4] font-medium'>Draft(1)</h1>
			</div>

			<CustomInput
				type='select'
				options={subjects}
				value={subjectName}
				onChange={handleSubjectChange}
				label='Subject Name'
				placeholder='Select Subject'
			/>
			<CustomInput
				type='select'
				options={subjectName ? chapters[subjectName as keyof typeof chapters] : []}
				value={chapterName}
				onChange={handleChapterChange}
				label='Chapter Name'
				placeholder='Select Chapter'
			/>
			<CustomInput
				type='select'
				options={chapterName ? topics[chapterName as keyof typeof topics] : []}
				value={topicName}
				onChange={(e: any) => setTopicName(e.target.value)}
				label='Topic Name'
				placeholder='Select Topic'
			/>
			<CustomInput
				type='number'
				value={numberOfQuestions}
				onChange={(e: any) => setNumberOfQuestions(e.target.value)}
				label='Number of Questions'
				placeholder='Enter Number of Questions'
			/>
			<div className='flex justify-between w-full gap-5'>
				<CustomInput
					type='radio'
					checked={difficulty === 'Easy'}
					onChange={() => setDifficulty('Easy')}
					label='Easy'
				/>
				<CustomInput
					type='radio'
					checked={difficulty === 'Moderate'}
					onChange={() => setDifficulty('Moderate')}
					label='Moderate'
				/>
				<CustomInput
					type='radio'
					checked={difficulty === 'Hard'}
					onChange={() => setDifficulty('Hard')}
					label='Hard'
				/>
			</div>
			<div className='flex justify-between w-full '>
				<button className='flex-1  py-2 text-[#787878] font-medium px-4 border bg-white border-[#787878] rounded-[6px] '>
					Save as Draft
				</button>
				<button
					onClick={handleCreateNow}
					className='flex-1 ml-2 py-2 px-4 bg-blue-500 text-white rounded-[6px] '
				>
					Create Now
				</button>
			</div>
      <Image src={icon} width={150} height={150} alt='customize quiz'/>
		</div>
	);
};

export default CustomizedQuiz;
