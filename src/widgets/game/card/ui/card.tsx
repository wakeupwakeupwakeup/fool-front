import { DragPreviewImage, useDrag } from 'react-dnd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDraggingCard } from '@/entities/game/model/local-game-data.slice'
import cn from 'clsx'
import { cardSizes, TSizeType } from '@/widgets/game/card/model/card.config'

type TCardPosition = 'hand' | 'table'

interface ICardProps {
	suit: string
	index: number
	totalCards?: number
	position: TCardPosition
	size?: TSizeType
}

export function Card({ suit, index, position, totalCards, size }: ICardProps) {
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

	useEffect(() => {
		console.log(suit)
		if (isDragging) {
			dispatch(setDraggingCard(suit))
		}
	}, [isDragging, index, dispatch, suit])

	const rotation =
		position === 'hand' && totalCards
			? (index - (totalCards + 1) / 2) * 5
			: 0

	return (
		<>
			<div
				ref={drag}
				className={cn(
					`z-50 transition-transform duration-200 hover:-translate-y-5`,
					{ dragging: isDragging },
				)}
				style={{
					transform: `rotate(${rotation}deg)`,
					position: position === 'hand' ? 'absolute' : 'static',
					transformOrigin: '0% 100%',
					width: size ? cardSizes[size].width : '120px',
					height: size ? cardSizes[size].height : '165px',
					backgroundImage: `url(/cards/${suit}.svg)`,
					backgroundRepeat: 'no-repeat',
					// transform: `rotate(${index * 10 - (totalCards - 1) * 5}deg`,
					left: position === 'hand' ? `${index * 35}px` : '',
					opacity: isDragging ? 0 : 1,
				}}
			></div>
		</>
	)
}
