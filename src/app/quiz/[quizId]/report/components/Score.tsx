import { ArrowUp, } from "lucide-react";
import Image from "next/image";

const Score = () => {
	return (
		<section className='shadow-section my-5 p-5 rounded-[10px] flex-1'>
			<h2 className='text-2xl font-semibold mb-4 text-[#9E9E9E]'>Score</h2>
			<div className='flex items-center justify-between'>
				<div>
					<div className='flex justify-center items-baseline'>
						<p className='text-9xl font-bold text-purple-500'>47</p>

						<span className='font-medium text-xl text-[#939393]'>marks</span>
					</div>
					<p className='font-medium text-xl text-[#939393]'>Scored out of 120 marks (30Q)</p>
					<div></div>
					<div className='flex font-medium justify-start items-center gap-5'>
						<div className='size-2 rounded-full bg-[#0FD679] '></div>
						<p>For correct answer +4 marks</p>
					</div>
					<div className='flex font-medium justify-start items-center gap-5'>
						<div className='size-2 rounded-full bg-[#E62308] '></div>
						<p>For incorrect answer -1 marks</p>
					</div>
				</div>
				<div className='bg-[#9654F42E] rounded-[6px] h-full flex flex-col justify-center items-center p-4 pb-0'>
					<h3 className='text-2xl font-semibold'>Improvement</h3>
					<p className='text-[#797979] text-xl font-medium'>
						Previous: <span className='text-blue-700'>30 marks</span>
					</p>
					<p className='text-[#797979] text-xl font-medium'>
						Improved:{' '}
						<span className='text-orange-300 '>
							+21% <ArrowUp className='inline' />
						</span>
					</p>
					<Image
						src={'/assets/images/improve.png'}
						alt='improve'
						width={180}
						height={150}
					/>
				</div>
			</div>
		</section>
	);
};

export default Score;
