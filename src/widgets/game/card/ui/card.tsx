import { DragPreviewImage, useDrag } from 'react-dnd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDraggingCard } from '@/entities/game/model/local-game-data.slice'
import cn from 'clsx'

type TCardPosition = 'hand' | 'table'

type TCardSize = {
	height: string
	width: string
} | null

interface ICardProps {
	suit: string
	index: number
	totalCards?: number
	position: TCardPosition
	size?: 's' | 'm' | 'l'
}

export function Card({ suit, index, position, size }: ICardProps) {
	const dispatch = useDispatch()
	const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		type: 'card',
		item: { index, suit },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	useEffect(() => {
		console.log(suit)
		if (isDragging) {
			dispatch(setDraggingCard(suit))
		}
	}, [isDragging, index, dispatch, suit])

	const cardSize: TCardSize = {
		height: '165px',
		width: '120px',
	}

	switch (position) {
		case 'table':
			switch (size) {
				case 's':
					cardSize.height = '82px'
					cardSize.width = '57px'
					break
				case 'm':
					cardSize.height = '135px'
					cardSize.width = '95px'
					break
				case 'l':
					cardSize.height = '165px'
					cardSize.width = '120px'
			}
	}

	return (
		!isDragging && (
			<>
				<DragPreviewImage
					connect={dragPreview}
					src={`/cards/${suit}.svg`}
				/>
				<div
					ref={drag}
					className={cn(
						position === 'hand'
							? isDragging
								? ''
								: 'absolute hover:-translate-y-5'
							: '',
						`transition-transform duration-200`,
						{ dragging: isDragging },
					)}
					style={{
						// rotate:
						// 	position === 'table'
						// 		? `${Math.floor(Math.random() * 11) - 5}deg`
						// 		: 'none',
						width: cardSize.width,
						height: cardSize.height,
						backgroundImage: `url(/cards/${suit}.svg)`,
						backgroundRepeat: 'no-repeat',
						// transform: `rotate(${index * 10 - (totalCards - 1) * 5}deg`,
						left: position === 'hand' ? `${index * 40}px` : '',
						opacity: isDragging ? 1 : 1,
					}}
				></div>
			</>
		)
	)
}
