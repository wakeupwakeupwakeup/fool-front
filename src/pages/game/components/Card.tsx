import cn from 'clsx'
import { CSSProperties, FC } from 'react'

import {
	TPositionCard,
	TSizeCard,
	cardSizeToDimensions,
} from '@/pages/game/game.interface'

interface IProps {
	size?: TSizeCard
	position?: TPositionCard
	type?: string
	className?: string
	style?: CSSProperties
}

const Card: FC<IProps> = ({
	style,
	className,
	type,
	position = 'top',
	size = 'normal',
}) => {
	return (
		<div
			className={cn('overflow-hidden absolute', className)}
			style={{
				...style,
				borderRadius: cardSizeToDimensions[size].radius,
			}}
		>
			<div
				className='bg-white bg-cover bg-no-repeat bg-center'
				style={{
					width: cardSizeToDimensions[size].width,
					height: cardSizeToDimensions[size].height,
					backgroundImage:
						position === 'bottom'
							? `url(/cards/cover.svg)`
							: `url(/cards/${type}.svg)`,
				}}
			/>
		</div>
	)
}

export default Card
