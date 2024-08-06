import cn from 'clsx'
import { FC } from 'react'

import { Icon, Typography } from '@/components/ui'

import { ICurrency } from '@/shared/types/auth.interface'
import { TCurrency } from '@/shared/types/game.interface'

interface IProps {
	selectedCurrency: TCurrency
	currency?: ICurrency
	setSelectedCurrency: (value: TCurrency) => void
}
const Currency: FC<IProps> = ({
	selectedCurrency,
	setSelectedCurrency,
	currency
}) => {
	/*const currency: {
		name: TCurrency
		count: string
		soon: boolean
	}[] = [
		{ name: 'foolcoin', count: '128', soon: false },
		{ name: 'toncoin', count: '64', soon: false },
		{ name: 'notcoin', count: '32 768', soon: true },
		{ name: 'tether', count: '32 768', soon: true }
	]*/
	const isSoon = (name: string) => {
		return ['tether', 'notcoin'].includes(name)
	}

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>На что играем?</Typography>
			<div className='grid grid-rows-2 grid-cols-2 gap-base-x6 w-full'>
				{currency &&
					Object.entries(currency).map(item => (
						<button
							onClick={() => setSelectedCurrency(item[0] as TCurrency)}
							key={item[0]}
							disabled={isSoon(item[0])}
							className={cn(
								'flex gap-base-x2 items-center rounded-base-x1 py-base-x1 px-base-x3 w-full border border-white relative',
								isSoon(item[0]) && 'border-opacity-40',
								selectedCurrency === item[0]
									? 'border-solid bg-radial-gradient bg-gradient'
									: 'border-dashed'
							)}
						>
							{isSoon(item[0]) && (
								<span className='text-yellow text-base-x3 font-bold absolute left-[50%] transform translate-x-[-50%] -rotate-[15deg]'>
									soon
								</span>
							)}
							<Icon size={25} icon={item[0]} />
							<Typography
								variant='text'
								className={cn(isSoon(item[0]) && 'opacity-40 hidden')}
							>
								{item[1]}
							</Typography>
						</button>
					))}
			</div>
		</div>
	)
}

export default Currency
