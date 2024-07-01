import DateIcon from '@/components/icons/DateIcon';
import BackButton from './BackButton';
import TimeIcon from '@/components/icons/TimeIcon';
import QuestionIcon from '@/components/icons/Questionicon';
import TrophyIcon from '@/components/icons/TrophyIcon';
import EfficiencyIcon from '@/components/icons/EfficiencyIcon';

const Header = () => {
	return (
		<header
			className='flex flex-col w-full items-start justify-between p-5 pb-6 border-b bg-[#9654F42E] gap-16'
		>
			<div className='flex justify-between w-full'>
				<BackButton />
				<h1 className='text-4xl font-semibold'>Quiz Report</h1>
				<div></div>
			</div>
			<div className='flex justify-around w-full'>
				<div className='flex flex-col justify-start items-start gap-5'>
					<div className='flex justify-center items-center gap-3'>
						<p className='text-[#9654F4] font-semibold text-3xl'>Weekly Quiz </p>
						<p className='text-xl'>(Jan 05 - Jan 11)</p>
					</div>
					<div className='flex space-x-2 text-gray-600 gap-10'>
						<div className='text-[#6C6C6C] font-medium text-xl flex justify-center items-center gap-2'>
							<DateIcon className='size-4' /> 18 Jan, 2024
						</div>
						<div className='text-[#6C6C6C] font-medium text-xl flex justify-center items-center gap-2'>
							<TimeIcon className='size-4' /> 30 min
						</div>
						<div className='text-[#6C6C6C] font-medium text-xl flex justify-center items-center gap-2'>
							<QuestionIcon className='size-4' /> 30 Questions
						</div>
					</div>
				</div>
				<div className='flex items-center space-x-4'>
					<div className='text-center shadow-card bg-[#ffffff] flex rounded-[10px] p-2 gap-6 w-[220px] justify-start items-center'>
						<div className='bg-[#FF990036]  size-12 flex justify-center items-center rounded-full'>
							<TrophyIcon />
						</div>
						<div className='text-[#AEAEAE] font-semibold text-2xl'>
							<p>Points</p>
							<p>
								<span className='text-black'>10</span>/20
							</p>
						</div>
					</div>
					<div className='text-center shadow-card bg-[#ffffff] flex rounded-[10px] p-2 gap-6 w-[220px] justify-start items-center'>
						<div className='bg-[#0FD67936]  size-12 flex justify-center items-center rounded-full'>
							<EfficiencyIcon />
						</div>
						<div className='text-[#AEAEAE] font-semibold text-2xl'>
							<p>Efficiency</p>
							<p>
								<span className='text-black'>36%</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
