import { Draggable, Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'
import Card from './Card'
import { IGameSession } from '@/entities/game/model/game.interface'
import { TPlayer } from '@/entities/player/model/player.model'
import { useState } from 'react'

interface ITable {
	gameBoard: Record<string, string>[]
	gameInfo: IGameSession
	currentPlayer: TPlayer
	emptyTableCards: string[]
}

export function Table({
	gameBoard,
	emptyTableCards,
	gameInfo,
	currentPlayer,
}: ITable) {
	const [tableCards, setTableCards] = useState(gameBoard)
	return (
		<div className='my-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-6 p-0'>
			{/* Пустая область всегда слева */}
			<Droppable droppableId='droppable-empty-table'>
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={cn(
							'flex h-[165px] w-[120px] flex-[25%] origin-bottom-left translate-x-[10%] scale-[78%] items-center justify-center',
							snapshot.isDraggingOver
								? 'border-green-500 bg-green-100 border-4'
								: 'border-gray-500 bg-gray-100 border-4',
						)}
					>
						{emptyTableCards.length === 0 ? (
							<span>Drop new card here</span>
						) : (
							emptyTableCards.map((card, index) => (
								<Draggable
									key={index}
									draggableId={`empty-card-${index}`}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className='card'
										>
											{card}
										</div>
									)}
								</Draggable>
							))
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>

			{/* Области для карт на столе */}
			{tableCards.map((cardPlace, index) => (
				<Droppable
					key={index}
					droppableId={`droppable-table-card-${index}`}
				>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={cn(
								'flex h-[165px] w-[120px] flex-[25%] origin-bottom-left translate-x-[10%] scale-[78%] items-center justify-center',
								snapshot.isDraggingOver
									? 'border-green-500 bg-green-100 border-4'
									: 'border-gray-500 bg-gray-100 border-4',
							)}
						>
							{Object.keys(cardPlace).length === 0 ? (
								<span>Drop card here</span>
							) : (
								Object.entries(cardPlace).map(
									(card, cardIndex) => (
										<Draggable
											key={cardIndex}
											draggableId={`table-card-${index}-${cardIndex}`}
											index={cardIndex}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className='card'
												>
													{card}
												</div>
											)}
										</Draggable>
									),
								)
							)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			))}
		</div>
	)
}
