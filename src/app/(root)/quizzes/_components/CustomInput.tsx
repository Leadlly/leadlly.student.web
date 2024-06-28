import { cn } from '@/lib/utils';
import React from 'react';

interface CustomInputProps {
	type: 'text' | 'number' | 'radio' | 'checkbox' | 'select';
	options?: string[];
	checked?: boolean;
	value?: string;
	onChange: any
	label?: string;
	placeholder?: string;
	name?: string; 
}
const CustomInput: React.FC<CustomInputProps> = ({
	type,
	options,
	checked,
	value,
	onChange,
	label,
	placeholder,
	name,
}) => {
	return (
		<label
			className={cn(
				'flex items-start w-full',
				type === 'radio' || type === 'checkbox' ? 'flex-row items-center justify-start gap-2' : 'flex-col '
			)}
		>
			{type === 'select' ? (
				<>
					{label && <span className='text-[#8E8E8E] font-medium'>{label}</span>}
					<select
						value={value}
						onChange={onChange}
						className='p-2 border border-[#9F9F9F] rounded-[6px] w-full text-[#CECDCD]'
					>
						<option
							value=''
							disabled
						>
							{placeholder}
						</option>
						{options &&
							options.map((option, index) => (
								<option
									key={index}
									value={option}
								>
									{option}
								</option>
							))}
					</select>
				</>
			) : type === 'radio' || type === 'checkbox' ? (
				<>
					<input
						type={type}
						checked={checked}
						onChange={onChange}
						className='form-radio text-[#CECDCD] h-4 w-4 border border-[#9F9F9F] rounded'
						name={name}
					/>
					{label && <span className='text-[#8E8E8E] font-medium'>{label}</span>}
				</>
			) : (
				<>
					{label && <span className='text-[#8E8E8E] font-medium'>{label}</span>}
					<input
						type={type}
						value={value}
						onChange={onChange}
						className='p-2 border border-[#9F9F9F] rounded-[6px] w-full text-[#CECDCD]'
						placeholder={placeholder}
					/>
				</>
			)}
		</label>
	);
};

export default CustomInput;
