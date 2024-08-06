import { Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'
import { FC } from 'react'

import { getId } from '@/services/auth/auth.helper'

import Card from './Card'

interface ITable {
	cardsOnTable: string[][]
	defendingPlayer: number
}

const Table: FC<ITable> = ({ cardsOnTable, defendingPlayer }) => {
	const tg_id = Number(getId())
	// TODO: подкидывать карту только отбивабщему
	return (
		<div className='flex flex-wrap items-center p-0 gap-base-[3px] gap-4 gap-x-6 justify-center my-auto scale-[77%]'>
			{cardsOnTable.map((cardPlace, index) => (
				<Droppable key={index} droppableId={`droppable-table-card-${index}`}>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={cn(
								'flex items-center justify-center w-[100px] h-[140px] origin-bottom-left'
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
										: 'transparent'
								}}
								className={cn(
									'border border-dashed transition-colors w-[95px] h-[135px] rounded-base-x1 absolute z-[-1]',
									cardPlace[0]
										? defendingPlayer === tg_id
											? 'rotate-12'
											: 'hidden'
										: '-rotate-6'
								)}
							/>
							{provided.placeholder}
							<div id={'floating-card-magnet' + index}></div>
							{cardPlace[0] && (
								<Card
									className={cn('-rotate-6', cardPlace[1] && 'brightness-75')}
									type={cardPlace[0]}
								/>
							)}
							{cardPlace[1] && (
								<Card className='rotate-12' type={cardPlace[0]} />
							)}
						</div>
					)}
				</Droppable>
			))}
		</div>
	)
}

export default Table
