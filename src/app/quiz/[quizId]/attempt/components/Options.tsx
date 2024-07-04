import React from 'react';

interface OptionsProps {
	options: string[];
	selectedOption: number | null;
	handleOptionChange: (index: number, questionNumber: number) => void;
	questionNumber: number;
}

const Options: React.FC<OptionsProps> = ({ options, selectedOption, handleOptionChange,questionNumber }) => {
	return (
		<div className='grid sm:grid-cols-2 gap-2 sm:gap-4 gap-x-20 grid-flow-row'>
			{options.map((option, index) => (
				<label
					key={index}
						className='border-2 p-4 focus-within:border-blue-500 border-[#E3E3E3] rounded-[6px] flex justify-start items-center gap-3'
				>
					
						<input
							type='radio'
							className='form-radio'
							name='option'
							value={index+1}
							checked={selectedOption === index+1}
							onChange={() => handleOptionChange(index+1,questionNumber)}
						/>
						<span className='ml-2'>{option}</span>
					</label>
				
			))}
		</div>
	);
};

export default Options;
