import { FC } from 'react'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	beatDeckLength: number | null
}
const Fall: FC<IProps> = ({ beatDeckLength }) => {
	if (!beatDeckLength) return null
	return (
		<div className='absolute transform rotate-[40deg] top-[140px] -right-[70px]'>
			<Typography
				variant='text'
				className='absolute flex items-center bg-white -rotate-[70deg] justify-center left-base-x1 bottom-base-x1 w-base-x6 h-base-x6 rounded-full text-blue font-bold border border-2 border-blue'
			>
				{beatDeckLength}
			</Typography>
			<div
				className='w-[90px] h-[125px] bg-white text-[#000] rounded-base-x1'
				style={{
					backgroundImage: `url(/cards/cover.svg)`,
				}}
			/>
		</div>
	)
}

export default Fall
