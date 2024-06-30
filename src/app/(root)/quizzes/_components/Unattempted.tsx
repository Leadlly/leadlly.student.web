'use client';

import { TabNavItem } from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import UnattemptedChapterWiseQuizzes from './UnattemptedChapterWiseQuiz';
import UnattemptedWeeklyQuizzes from './UnattemptedWeeklyQuizzes';
import CustomizedQuiz from './CustomizedQuiz';

const unattemptTabs = [
	{
		id: 'weeklyquiz',
		label: 'Weekly Quiz',
	},
	{
		id: 'chapterquiz',
		label: 'Chapter Quiz',
	},
];

const Unattempted = () => {
	// Example data for upcoming quizzes
	const [weeklyQuizzes, setWeeklyQuizzes] = useState([
		{
			id: 1,
			description: 'Weekly Quiz 1: Vector Algebra, Matrices and Determinants',
			startDate: '2024-01-05',
			endDate: '2024-01-11',
			subjects: [
				{ name: 'Maths', color: 'bg-blue-500' },
				{ name: 'Physics', color: 'bg-green-500' },
				{ name: 'Chemistry', color: 'bg-red-500' },
			],
			questions: 30,
		},
		{
			id: 2,
			description: 'Weekly Quiz 2: Electromagnetic Induction, Laws of Motion',
			startDate: '2024-12-21',
			endDate: '2024-12-27',
			subjects: [
				{ name: 'Maths', color: 'bg-blue-500' },
				{ name: 'Physics', color: 'bg-green-500' },
				{ name: 'Chemistry', color: 'bg-red-500' },
			],
			questions: 30,
		},
	]);

	const [chapterQuizzes, setChapterQuizzes] = useState([
		{
			id: 1,
			chapterName: 'Chemical Bonding',
			description:
				'Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding ',
			subject: { name: 'Chemistry', color: 'bg-red-500' },

			questions: 40,
		},
		{
			id: 2,
			chapterName: 'Laws of Motion',
			description:
				'Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding ',
			subject: { name: 'Physics', color: 'bg-green-500' },
			questions: 40,
		},
		{
			id: 3,
			chapterName: 'Laws of Motion',
			description:
				'Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding ',
			subject: { name: 'Physics', color: 'bg-green-500' },
			questions: 40,
		},
		{
			id: 4,
			chapterName: 'Laws of Motion',
			description:
				'Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding ',
			subject: { name: 'Physics', color: 'bg-green-500' },
			questions: 40,
		},
		{
			id:62,
			chapterName: 'Laws of Motion',
			description:
				'Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding ',
			subject: { name: 'Physics', color: 'bg-green-500' },
			questions: 40,
		},
	]);

	const [activeTab, setActiveTab] = useState('weeklyquiz');

	return (
		<div className='flex flex-col  mb-20 md:mb-0'>
			{/* Upcoming meetings */}
			<div className='flex gap-3  justify-between	'>
				<div className='py-3 border-2 rounded-xl flex-1 mb-5 h-full '>
					<ul className='flex justify-around'>
						{unattemptTabs.map((tab) => (
							<TabNavItem
								key={tab.id}
								id={tab.id}
								title={tab.label}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								layoutIdPrefix='meetings'
								className='text-base md:text-lg lg:text-xl text-black font-medium leading-none capitalize px-6 py-2.5'
								activeTabClassName='h-full inset-0 rounded-full bg-primary/25'
							/>
						))}
					</ul>

					<hr className='border-gray-300 my-3' />

					<div className='max-h-[470px] lg:max-h-[700px]  xl:max-h-[470px] h-full overflow-y-auto custom__scrollbar'>
						{/* Upcoming Meetings Tab */}
						{activeTab == 'weeklyquiz' && <UnattemptedWeeklyQuizzes quizzes={weeklyQuizzes} />}
						{activeTab == 'chapterquiz' && (
							<UnattemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
						)}
					</div>
				</div>
				<CustomizedQuiz />
			</div>
		</div>
	);
};

export default Unattempted;
