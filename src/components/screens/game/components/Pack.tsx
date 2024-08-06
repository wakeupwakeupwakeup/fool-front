import { FC } from 'react'

import { Typography } from '@/components/ui'

interface IProps {
	trumpCard: string | null
	remainingDeckLength: number | null
}
const Pack: FC<IProps> = ({ trumpCard, remainingDeckLength }) => {
	if (!trumpCard || !remainingDeckLength) return null
	return (
		<div className='absolute transform top-[140px] rotate-[40deg] -left-[140px]'>
			<Typography
				variant='text'
				className='absolute flex items-center bg-white z-20 -rotate-[40deg] justify-center right-base-x1 top-base-x1 w-base-x6 h-base-x6 rounded-full text-blue font-bold border-2 border-blue'
			>
				{remainingDeckLength}
			</Typography>
			<div
				className='w-[90px] h-[125px] rounded-base-x1 relative z-10'
				style={{
					backgroundImage: `url(/cards/cover.svg)`
				}}
			/>
			<div
				className='w-[90px] h-[125px] relative transform rotate-90 translate-x-[50%] translate-y-[-100%] rounded-base-x1'
				style={{
					backgroundImage: `url(/cards/${trumpCard}.svg)`
				}}
			/>
		</div>
	)
}

export default Pack
