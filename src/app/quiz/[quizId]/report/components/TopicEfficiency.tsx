import { Progress } from '@/components/ui/progress';
import {  getProgressBarColor } from '@/helpers/constants/efficiency';
import { ChevronDown } from 'lucide-react';

const TopicsEfficiency = () => {
	const efficiencies = [
		{ topic: 'Vector Algebra', efficiency: 81 },
		{ topic: 'Matrices and Determinants', efficiency: 67 },
		{ topic: 'Electromagnetic Induction', efficiency: 26 },
		{ topic: 'Chemical Bonding', efficiency: 91 },
		{ topic: 'Atomic Structures', efficiency: 72 },
		{ topic: 'Vector Algebra', efficiency: 81 },
		{ topic: 'Matrices and Determinants', efficiency: 67 },
		{ topic: 'Electromagnetic Induction', efficiency: 26 },
		{ topic: 'Chemical Bonding', efficiency: 91 },
		{ topic: 'Atomic Structures', efficiency: 72 },
	];

	return (
		<section className='shadow-section my-5 p-5 rounded-[10px] flex-1'>
			<h2 className='text-xl font-bold mb-4'>Topics Efficiency</h2>
			<div className='flex flex-col justify-start items-stretch  max-h-52 p-3 overflow-y-scroll custom__scrollbar '>
				{efficiencies.map(({ topic, efficiency }) => (
					<div
						key={topic}
						className='flex items-center justify-between'
					>
						<div className='flex justify-center items-center gap-4'>
							<ChevronDown className='size-5' />
							<span>{topic}</span>
						</div>
						<div className='flex justify-center items-center gap-5'>
							<Progress
								value={efficiency}
								className='h-2 bg-[#00000012] min-w-[120px]'
								indicatorClassName={getProgressBarColor(efficiency)}
							/>
							<span className='font-semibold text-[#9E9E9E]'>{efficiency}%</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default TopicsEfficiency;
