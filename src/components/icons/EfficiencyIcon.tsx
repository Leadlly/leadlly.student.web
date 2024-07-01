import { cn } from "@/lib/utils";


const EfficiencyIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			id='target'
			className={cn('size-8', className)}
		>
			<path
				fill='#0fd679'
				fill-rule='evenodd'
				d='M19.235 2.353a.75.75 0 0 0-1.07-.524l-.595.297a4.79 4.79 0 0 0-2.438 5.682L11.47 11.47a.75.75 0 1 0 1.06 1.06l3.662-3.662a4.79 4.79 0 0 0 5.682-2.438l.297-.595a.75.75 0 0 0-.524-1.07l-2.01-.402-.402-2.01Zm1.14 3.687a3.29 3.29 0 0 1-3.793 1.378 3.29 3.29 0 0 1 1.378-3.792l.305 1.521a.75.75 0 0 0 .588.588l1.521.305Z'
				clip-rule='evenodd'
				className='color292d32 svgShape'
			></path>
			<path
				fill='#0fd679'
				d='M12.517 7.973a4.06 4.06 0 1 0 3.516 3.569.75.75 0 0 1 1.49-.17 5.56 5.56 0 1 1-4.815-4.887.75.75 0 1 1-.191 1.488Z'
				className='color292d32 svgShape'
			></path>
			<path
				fill='#0fd679'
				d='M8.517 4.521a8.25 8.25 0 0 1 5.153-.6.75.75 0 1 0 .303-1.47 9.75 9.75 0 1 0 7.581 7.604.75.75 0 1 0-1.47.3A8.25 8.25 0 1 1 8.517 4.52Z'
				className='color292d32 svgShape'
			></path>
		</svg>
	);
};
export default EfficiencyIcon