import cn from 'clsx'
import { ReactElement } from 'react'

import { TCurrency } from '@/entities/game/model/game.interface'
import { Typography } from '@/shared/ui/typography'
import Icon from '@/shared/ui/icon/Icon'

const currencies: { name: TCurrency }[] = [{ name: 'Fool' }, { name: 'Ton' }]

interface ICurrencyProps {
	selectedCurrency: TCurrency
	setSelectedCurrency: (value: TCurrency) => void
}
export function Currency({
	selectedCurrency,
	setSelectedCurrency,
}: ICurrencyProps): ReactElement {
	const isSoon = (name: string) => {
		return ['tether', 'notcoin'].includes(name)
	}

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>На что играем?</Typography>
			<div className='grid grid-rows-2 grid-cols-2 gap-base-x6 w-full'>
				{currencies.map(currency => (
					<button
						key={currency.name}
						onClick={() => setSelectedCurrency(currency.name)}
						disabled={isSoon(currency.name)}
						className={cn(
							'flex gap-base-x2 items-center rounded-base-x1 py-base-x1 px-base-x3 w-full border border-white relative',
							isSoon(currency.name) && 'border-opacity-40',
							selectedCurrency === currency.name
								? 'border-solid bg-radial-gradient bg-gradient'
								: 'border-dashed',
						)}
					>
						{isSoon(currency.name) && (
							<span className='text-yellow text-base-x3 font-bold absolute left-[50%] transform translate-x-[-50%] -rotate-[15deg]'>
								soon
							</span>
						)}
						<Icon size={25} icon={currency.name} />
						<Typography
							variant='text'
							className={cn(
								isSoon(currency.name) && 'opacity-40 hidden',
							)}
						>
							{currency.name.toUpperCase()}
						</Typography>
					</button>
				))}
				{/*{currency &&*/}
				{/*	Object.entries(currency).map(item => (*/}
				{/*		<button*/}
				{/*			onClick={() =>*/}
				{/*				setSelectedCurrency(item[0] as TCurrency)*/}
				{/*			}*/}
				{/*			key={item[0]}*/}
				{/*			disabled={isSoon(item[0])}*/}
				{/*			className={cn(*/}
				{/*				'flex gap-base-x2 items-center rounded-base-x1 py-base-x1 px-base-x3 w-full border border-white relative',*/}
				{/*				isSoon(item[0]) && 'border-opacity-40',*/}
				{/*				selectedCurrency === item[0]*/}
				{/*					? 'border-solid bg-radial-gradient bg-gradient'*/}
				{/*					: 'border-dashed',*/}
				{/*			)}*/}
				{/*		>*/}
				{/*			{isSoon(item[0]) && (*/}
				{/*				<span className='text-yellow text-base-x3 font-bold absolute left-[50%] transform translate-x-[-50%] -rotate-[15deg]'>*/}
				{/*					soon*/}
				{/*				</span>*/}
				{/*			)}*/}
				{/*			<Icon size={25} icon={item[0]} />*/}
				{/*			<Typography*/}
				{/*				variant='text'*/}
				{/*				className={cn(*/}
				{/*					isSoon(item[0]) && 'opacity-40 hidden',*/}
				{/*				)}*/}
				{/*			>*/}
				{/*				{item[1]}*/}
				{/*			</Typography>*/}
				{/*		</button>*/}
				{/*	))}*/}
			</div>
		</div>
	)
}

export default Currency
