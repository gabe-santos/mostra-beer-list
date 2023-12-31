import BeerItem from './components/BeerItem';
import { getGoogleSheetsData } from '../lib/gsheets';
import { Beer } from '../lib/types';

const testBeer: Beer[] = [
	{
		name: 'Juice+',
		brewery: 'GOAL Brewing',
		style: 'Smoothie Sour',
		abv: '6',
		description: 'Sour Ale fruited with Kent Atkins and Alphonso Mangos',
		sizes: ['10'],
		prices: ['8.50'],
	},
	{
		name: 'Kampeon',
		brewery: 'GOAL Brewing',
		style: 'Philippine Rice Lager',
		abv: '5.2',
		sizes: ['10', '16'],
		description:
			'Philippine-style Rice Lager made in collaboration with Kampeon Clothing Brand',
		prices: ['5.75', '7.50'],
	},
	{
		name: 'Pampanga Punch',
		brewery: 'Harland Brewing (w/ Moksa Brewing and Apl.de.ap)',
		style: 'Imperial fruited sour',
		abv: '8.5',
		sizes: ['10', '16'],
		prices: ['8.50', '12.50'],
		description:
			'Imperial fruited sour w/ mango, guava, passion fruit, and cascara',
	},
	{
		name: 'FOMO+ (2023)',
		brewery: 'Bottle Logic',
		style: 'Imperial Stout',
		abv: '13',
		sizes: ['5'],
		prices: ['7.50'],
		description:
			'Bourbon Barrel-Aged Imperial Vanilla + Coffee Stout. A collaboration that gets better every year.',
	},
	{
		name: 'Bourbon Barrel Aged Double Stack 2023',
		brewery: 'Great Notion x Mostra',
		style: 'Imperial Stout',
		abv: '14.4',
		description:
			'Bourbon Barrel aged Imperial stout aged in Heaven Hill barrels for 29 months then finished with high quality maple syrup and Mostra Ghost Bear',
		sizes: ['5'],
		prices: ['7.50'],
	},
	{
		name: 'Blueberry Muffin',
		brewery: 'Great Notion',
		style: 'Fruited Sour',
		abv: '6',
		description:
			'The sour beer that tastes just like a Blueberry Muffin. This longstanding classic is made with Oregon blueberries and baked to perfection.',
		sizes: ['10', '16'],
		prices: ['7.00', '8.75'],
	},
];

export const revalidate = 60;

export default async function Home() {
	// const [beers, setBeers] = useState<Beer[]>([]);
	const range = 'Sheet1!A2:G9';
	const posts = await getGoogleSheetsData(range);

	return (
		<div className='flex justify-center w-full '>
			<div className='sm:max-w-[700px] mt-8 px-8'>
				<h1 className='text-[61px] w-full text-left mb-8 tracking-wider'>
					BEER
				</h1>
				{posts?.map((posts, i) => {
					const [
						name,
						brewery,
						style,
						abv,
						sizes,
						prices,
						description,
					] = posts;

					console.log(sizes.split(', '));

					const sizesArray = sizes.split(', ');
					const pricesArray = prices.split(', ');

					return (
						<BeerItem
							key={i}
							name={name}
							brewery={brewery}
							style={style}
							abv={abv}
							description={description}
							sizes={sizesArray}
							prices={pricesArray}
							className={'mt-8'}
						/>
					);
				})}

				{/* {testBeer.map((beer, i) => {
					return <BeerItem key={i} {...beer} className={'mt-8'} />;
				})} */}
			</div>
		</div>
	);
}
