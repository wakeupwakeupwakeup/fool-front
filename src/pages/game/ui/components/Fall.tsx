import { FC } from 'react'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	beatDeckLength: number | null
}
const Fall: FC<IProps> = ({ beatDeckLength }) => {
	if (!beatDeckLength) return null
	return (
		<div className='absolute -right-[70px] top-[140px] rotate-[40deg] transform'>
			<Typography
				variant='text'
				className='absolute bottom-base-x1 left-base-x1 flex h-base-x6 w-base-x6 -rotate-[70deg] items-center justify-center rounded-full border-2 border-blue bg-white font-bold text-blue'
			>
				{beatDeckLength}
			</Typography>
			<div
				className='h-[125px] w-[90px] rounded-base-x1 bg-white text-[#000]'
				style={{
					backgroundImage: `url(/cards/cover.svg)`,
				}}
			/>
		</div>
	)
}

export default Fall
