import cn from 'clsx'
import { Typography } from '@/shared/ui/typography'
import { ReactElement } from 'react'

interface IProps {
	selectedCountRivals: number
	setSelectedCountRivals: (value: number) => void
}

export function Rivals({
	selectedCountRivals,
	setSelectedCountRivals,
}: IProps): ReactElement {
	const countRivals = [2, 3, 4]

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<div className='flex w-full flex-col items-center gap-base-x2'>
				<Typography variant='text'>Количество игроков</Typography>
				<div className='flex w-full justify-between gap-base-x5'>
					{countRivals.map(item => (
						<button
							onClick={() => setSelectedCountRivals(item)}
							key={item}
							className={cn(
								'relative w-full rounded-base-x1 border border-white px-base-x3 py-base-x1',
								selectedCountRivals === item
									? 'border-solid bg-gradient bg-radial-gradient'
									: 'border-dashed',
							)}
						>
							<Typography variant='text'>{item}</Typography>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
