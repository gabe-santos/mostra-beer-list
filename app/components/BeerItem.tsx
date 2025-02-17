import { twMerge } from 'tailwind-merge';

interface BeerItemProps {
	name: string;
	brewery: string;
	style: string;
	abv: string;
	description: string;
	sizes: string[];
	prices: string[];
	className?: string;
}

export default function BeerItem({
	name,
	brewery,
	style,
	abv,
	description,
	sizes,
	prices,
	className,
}: BeerItemProps) {
	const classes = twMerge('flex gap-1 flex-col', className);

	return (
		<div className={classes}>
			<h2 className=' uppercase text-[25px] font-semibold tracking-wider'>
				{name}
			</h2>
			<p className='italic'>
				{brewery} - {style}
			</p>
			<p>{description}</p>
			<div className='flex gap-3'>
				<p className='text-amber-700 font-bold'>{abv}% ABV</p>
				{sizes?.map((s, i) => {
					return (
						<p key={i}>
							{s}oz: ${prices[i]}
						</p>
					);
				})}
			</div>
		</div>
	);
}
