import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app'
import { Card } from '@/widgets/game/card/ui/card'
import { addCardToBoard } from '@/entities/game/model/local-game-data.slice'
import { useEffect } from 'react'
import cn from 'clsx'

export function GameTable() {
	const dispatch = useDispatch()
	const gameBoard = useSelector(
		(state: RootState) => state.localGameData.gameBoard,
	)
	const droppedCard = useSelector(
		(state: RootState) => state.localGameData.draggingCard,
	)
	const [, drop] = useDrop(
		() => ({
			accept: 'card',
			drop: () => {
				if (droppedCard) {
					dispatch(addCardToBoard({ [droppedCard]: '' }))
				}
			},
		}),
		[droppedCard],
	)

	useEffect(() => {
		console.log(gameBoard, droppedCard)
	}, [gameBoard, droppedCard])
	return (
		<div
			className={cn(
				gameBoard.length < 3
					? 'grid-cols-3 grid-rows-1'
					: 'grid-cols-3 grid-rows-2',
				'grid h-1/2 w-full translate-y-1/2 place-items-center',
			)}
			ref={drop}
		>
			{gameBoard.length > 0 &&
				gameBoard.map((card, index) => (
					<Card
						size={gameBoard.length < 3 ? 'l' : 'm'}
						position='table'
						key={index}
						suit={Object.keys(card)[0]}
						index={index}
					/>
				))}
		</div>
	)
}
