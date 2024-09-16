import { Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'
import Card from './Card'
import { IGameSession } from '@/entities/game/model/game.interface'
import { TPlayer } from '@/entities/player/model/player.model'

interface ITable {
	cardsOnTable: Record<string, string>[]
	gameInfo: IGameSession
	currentPlayer: TPlayer
}

export function Table({ cardsOnTable, gameInfo, currentPlayer }: ITable) {
	return (
		<div className='my-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-6 p-0'>
			{cardsOnTable.map((cardPlace, index) => (
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
							)}
						>
							<div
								style={{
									borderColor: cardPlace[1]
										? 'transparent'
										: snapshot.isDraggingOver
											? '#00EF26'
											: 'white',
									backgroundColor: cardPlace[1]
										? 'transparent'
										: snapshot.isDraggingOver
											? '#ffffff30'
											: 'transparent',
								}}
								className={cn(
									'absolute z-[-1] h-[165px] w-[120px] rounded-base-x1 border border-dashed transition-colors',
									cardPlace[0]
										? gameInfo.defender_id ===
											currentPlayer.index
											? 'rotate-12'
											: 'hidden'
										: '-rotate-6',
								)}
							/>
							{provided.placeholder}
							<div id={'floating-card-magnet' + index}></div>
							{cardPlace[0] && (
								<Card
									className={cn(
										'-rotate-6 rounded-[6px]',
										cardPlace[1] && 'brightness-75',
									)}
									size='big'
									type={cardPlace[0]}
								/>
							)}
							{cardPlace[1] && (
								<Card
									className='rotate-12 rounded-[6px]'
									type={cardPlace[1]}
									size='big'
								/>
							)}
						</div>
					)}
				</Droppable>
			))}
		</div>
	)
}

export default Table
