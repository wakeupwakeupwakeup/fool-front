import cn from 'clsx'
import { CSSProperties, FC } from 'react'

import {
	TPositionCard,
	TSizeCard,
	cardSizeToDimensions,
} from '@/pages/game/model/game.interface'
import { useDrag } from 'react-dnd'

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
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	return (
		<div
			ref={drag}
			className={cn('absolute overflow-hidden', className)}
			style={{
				...style,
				// borderRadius: cardSizeToDimensions[size].radius,
			}}
		>
			<div
				className='bg-white bg-cover bg-center bg-no-repeat'
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
