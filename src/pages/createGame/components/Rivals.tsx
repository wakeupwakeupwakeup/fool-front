import cn from 'clsx'
import { FC } from 'react'

import { Typography } from '@/components/ui'

interface IProps {
	selectedCountRivals: number
	setSelectedCountRivals: (value: number) => void
}

const Rivals: FC<IProps> = ({
	selectedCountRivals,
	setSelectedCountRivals
}) => {
	const countRivals = [1, 2, 3]

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<div className='flex flex-col items-center gap-base-x2 w-full'>
				<Typography variant='text'>Количество соперников</Typography>
				<div className='flex justify-between w-full gap-base-x5'>
					{countRivals.map(item => (
						<button
							onClick={() => setSelectedCountRivals(item)}
							key={item}
							className={cn(
								'w-full rounded-base-x1 py-base-x1 px-base-x3 border border-white relative',
								selectedCountRivals === item
									? 'border-solid bg-radial-gradient bg-gradient'
									: 'border-dashed'
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

export default Rivals
