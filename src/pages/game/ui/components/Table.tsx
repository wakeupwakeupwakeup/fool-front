import { Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'
import { FC } from 'react'

import Card from './Card'
import { getId } from '@/entities/auth'

interface ITable {
	cardsOnTable: string[][]
	defendingPlayer: string
}

const Table: FC<ITable> = ({ cardsOnTable, defendingPlayer }) => {
	const tg_id = String(getId())

	return (
		<div className='flex flex-wrap items-center p-0 gap-y-6 gap-x-3 justify-center my-auto'>
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
								'flex justify-center flex-[25%] items-center w-[120px] h-[165px] origin-bottom-left scale-[78%] translate-x-[10%]',
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
									'border border-dashed transition-colors w-[120px] h-[165px] rounded-base-x1 absolute z-[-1]',
									cardPlace[0]
										? defendingPlayer === tg_id
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
