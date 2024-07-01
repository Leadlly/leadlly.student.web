import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getTextColor } from '@/helpers/constants/efficiency';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Subject {
	name: string;
	color: string;
}

interface AttemptedQuizProps {
	id: number;
	chapterName: string;
	description: string;
	subject: Subject;
	questions: number;
	date: string;
	efficiency: number;
}

type Props = { quiz: AttemptedQuizProps };

const AttemptedQuiz = ({ quiz }: Props) => {
	return (
		<div
			key={quiz.id}
			className='flex items-stretch gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg'
		>
			<div className='w-full flex flex-col justify-start space-y-1'>
				<div className='w-full flex items-center justify-between'>
					<h1 className='text-base md:text-2xl font-semibold'>{quiz.chapterName}</h1>
				</div>
				<div className='flex justify-between space-y-1 space-x-4 items-end'>
					{/* Left Side */}
					<div className='w-full md:w-2/3 font-medium'>
						<p className='text-gray-600 text-xs md:text-sm my-1'>{quiz.description}</p>
						<div className='mt-5 flex items-center mb-1 gap-10'>
							<div className='flex items-center'>
								<Label className={`text-white py-1 px-2 mx-1 rounded ${quiz.subject.color}`}>
									{quiz.subject.name}
								</Label>{' '}
								<p className='text-gray-600 text-xs md:text-sm my-1'>
									{quiz.questions} Quiz Questions
								</p>
							</div>

							<p className='text-gray-600 text-xs md:text-sm my-1'>{quiz.date}</p>
						</div>
					</div>
					{/* Right Side */}
					<div className='text-right'>
						<p className={cn(' text-xs md:text-sm my-1', getTextColor(quiz.efficiency))}>
							Completed Test with {quiz.efficiency}% Efficiency
						</p>
						<Link href={`quiz/${quiz.id}/report`}>
							{' '}
							<Button className='mt-2 bg-white border-black text-black hover:bg-slate-100 border-2 font-medium'>
								View Details <ChevronRight size={20} />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AttemptedQuiz;
