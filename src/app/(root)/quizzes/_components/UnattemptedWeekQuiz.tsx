import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
interface Subject {
	name: string;
	color: string;
}
interface WeeklyQuiz {
	id: number;
	description: string;
	startDate: string;
	endDate: string;
	subjects: Subject[];
	questions: number;
}

type Props = { quiz: WeeklyQuiz };
const UnattemptedWeekQuiz = ({ quiz }: Props) => {
	type DateString = string;
	// Function to format date
	function formatDate(dateString: DateString): string {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		return `${day} ${month}`;
	}

	// Function to calculate days left until the meeting
	function calculateDaysLeft(meetingDate: Date): number {
		// Get the current date
		const currentDate = new Date();

		// Calculate the difference in milliseconds
		const differenceInMs = meetingDate.getTime() - currentDate.getTime();
		
		// Convert milliseconds to days
		const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
		return daysLeft ;
	}
	const daysLeft = calculateDaysLeft(new Date(quiz.endDate));

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
					{daysLeft <= 0 ? (
						<p className='text-xs md:text-sm text-red-800 font-medium'>Quiz closed</p>
					) : daysLeft <= 1 ? (
						<p className='text-xs md:text-sm text-orange-600'>Quiz closes soon</p>
					) : (
						<p className='text-xs md:text-sm text-primary'>Remaining {daysLeft} days to Take Quiz</p>
					)}
				</div>
				<div className='flex justify-between space-y-1 space-x-4 items-end'>
					{/* Left Side */}
					<div className='w-full md:w-2/3'>
						<p className='text-gray-600 text-xs md:text-sm my-1'>{quiz.description}</p>
						<div className='mt-5 mb-1'>
							{quiz.subjects.map((subject, index) => (
								<Label
									key={index}
									className={`text-white py-1 px-2 mx-1 rounded ${subject.color}`}
								>
									{subject.name}
								</Label>
							))}
						</div>
					</div>
					{/* Right Side */}
					<div>
						<p className='text-gray-600 my-1'>{quiz.questions} Quiz Questions</p>
						<Button>Attempt Now</Button>
					</div>
				</div>
				<div className='flex justify-between items-center'></div>
			</div>
		</div>
	);
};
export default UnattemptedWeekQuiz;
