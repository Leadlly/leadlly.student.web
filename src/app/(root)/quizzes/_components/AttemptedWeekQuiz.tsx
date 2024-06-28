import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';
interface Subject {
	name: string;
	color: string;
}
interface WeeklyQuiz {
	id: number;
	description: string;
	startDate: string;
	endDate: string;
	subject: Subject;
	completedDate:string,
	efficiency:number,
	questions: number;
}

type Props = { quiz: WeeklyQuiz };
const AttemptedWeekQuiz = ({ quiz }: Props) => {
	type DateString = string;
	// Function to format date
	function formatDate(dateString: DateString): string {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		return `${day} ${month}`;
	}

	
	return (
		<div
			key={quiz.id}
			className='flex items-stretch gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg'
		>
			<div className='w-full flex flex-col justify-start space-y-1'>
				<div className='w-full flex items-center justify-between'>
					<h1 className='text-base md:text-2xl font-semibold'>
						{formatDate(quiz.startDate)} - {formatDate(quiz.endDate)}
					</h1>
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

							<p className='text-gray-600 text-xs md:text-sm my-1'>{quiz.completedDate}</p>
						</div>
					</div>
					{/* Right Side */}
					<div className='text-right'>
						<p className='text-green-600 text-xs md:text-sm my-1'>
							Completed Test with {quiz.efficiency} Efficiency
						</p>
						<Button className='mt-2 bg-white border-black text-black hover:bg-slate-100 border-2 font-medium'>
							View Details <ChevronRight size={20} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AttemptedWeekQuiz;
