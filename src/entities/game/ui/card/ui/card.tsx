import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { setDraggingCard } from '@/entities/game/model/store/local-game-data.slice'
import cn from 'clsx'
import { cardSizes, TSizeType } from '@/entities/game/ui/card/model/card.config'

import { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
type TCardPosition = 'hand' | 'table'

interface ICardProps {
	suit: string
	index: number
	totalCards?: number
	position: TCardPosition
	size?: TSizeType
}

export function Card({
	suit,
	index,
	position,
	totalCards,
	size,
}: Readonly<ICardProps>) {
	const dispatch = useDispatch()
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'card',
			item: { index, suit },
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[suit],
	)
	const angleOffset = 5
	const shift = 35
	const cardRotation = (index - (totalCards! - 1) / 2) * angleOffset
	const translateX = (index - (totalCards! - 1) / 2) * shift

	useEffect(() => {
		console.log(isDragging)

		if (isDragging) {
			dispatch(setDraggingCard(suit))
		}
	}, [isDragging, dispatch, suit, index])

	return (
		<animated.div
			ref={drag}
			className={cn(`shrink-0`, {
				'shadow-lg shadow-black': position === 'hand',
			})}
			style={{
				visibility: isDragging ? 'hidden' : 'visible',
				zIndex: index + 20,
				bottom: -80,
				position: position === 'hand' ? 'absolute' : 'static',
				width: size ? cardSizes[size].width : '120px',
				height: size ? cardSizes[size].height : '165px',
				backgroundImage: `url(/cards/${suit}.svg)`,
				backgroundRepeat: 'no-repeat',
				transform: `rotate(${cardRotation}deg) translateX(${translateX}px)`,
				transformOrigin: 'bottom center',
			}}
		/>
	)
}
