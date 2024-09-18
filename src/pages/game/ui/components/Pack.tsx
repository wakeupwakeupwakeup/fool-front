import { FC } from 'react'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	trumpCard: string | null
	remainingDeckLength: number | null
}
const Pack: FC<IProps> = ({ trumpCard, remainingDeckLength }) => {
	if (!trumpCard) return null

	if (remainingDeckLength === 0)
		return (
			<div className='absolute left-0 top-[140px]'>
				<div
					className='relative z-10 h-[30px] w-[30px] bg-contain bg-no-repeat'
					style={{
						backgroundImage: `url(/cards/${trumpCard.charAt(trumpCard.length - 1)}.svg)`,
					}}
				/>
			</div>
		)
	return (
		<div className='absolute -left-[110px] top-[90px] rotate-[45deg] transform'>
			<Typography
				variant='text'
				className='absolute right-base-x1 top-base-x1 z-20 flex h-base-x6 w-base-x6 -rotate-[45deg] items-center justify-center rounded-full border-2 border-blue bg-white font-bold text-blue'
			>
				{remainingDeckLength}
			</Typography>
			<div
				className='relative z-10 h-[125px] w-[90px] rounded-base-x1 bg-no-repeat'
				style={{
					backgroundImage: `url(/cards/cover.svg)`,
				}}
			/>
			<div
				className='relative h-[125px] w-[90px] translate-x-[30%] translate-y-[-100%] rotate-90 transform rounded-base-x1 bg-no-repeat'
				style={{
					backgroundImage: `url(/cards/${trumpCard}.svg)`,
				}}
			/>
		</div>
	)
}

export default Pack
