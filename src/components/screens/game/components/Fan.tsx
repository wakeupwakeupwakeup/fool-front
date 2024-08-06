import { Draggable, Droppable } from '@hello-pangea/dnd'
import { FC } from 'react'

import { Button, Icon } from '@/components/ui'

import { getId } from '@/services/auth/auth.helper'

import avatar from '@/assets/tapps.png'

import DraggableCard from './DraggableCard'

interface IProps {
	cards: string[]
	onSubmit: () => void
	buttonText: string
	defendingPlayer: number
	attackPlayer: number
}

const Fan: FC<IProps> = ({
	cards,
	onSubmit,
	buttonText,
	defendingPlayer,
	attackPlayer
}) => {
	const tg_id = Number(getId())
	return (
		<div className='relative w-full'>
			<div className='relative bottom-[140px] flex justify-between'>
				{defendingPlayer === tg_id && (
					<Icon
						size={25}
						icon='defending'
						className='absolute -top-base-x2 -left-base-x2 z-40'
					/>
				)}
				{attackPlayer === tg_id && (
					<Icon
						size={25}
						icon='attack'
						className='absolute -top-base-x2 -left-base-x2 z-40'
					/>
				)}
				<img
					src={avatar}
					alt=''
					className='w-base-x7 h-base-x7 rounded-base-x1'
				/>
				{!!buttonText && (
					<Button
						className='rounded-full border border-white'
						style={{
							width: 64,
							height: 64
						}}
						onClick={onSubmit}
					>
						{buttonText}
					</Button>
				)}
			</div>
			<div className='absolute bottom-[100px] left-[50%] flex flex-row items-center justify-center'>
				{cards.map((card, index) => (
					<Droppable key={index} droppableId={`droppable-card-${index}`}>
						{(provided, _) => (
							<div
								style={{
									position: 'absolute',
									zIndex: index + 1,
									left: `${
										(index - cards.length / 2) * ((40 * 6) / cards.length)
									}px `
								}}
							>
								<div ref={provided.innerRef} {...provided.droppableProps}>
									{provided.placeholder}
									<Draggable index={index} draggableId={'draggable-' + index}>
										{(provided, snapshot) => (
											<DraggableCard
												type={card}
												num={index}
												provided={provided}
												snapshot={snapshot}
												total={cards.length}
											/>
										)}
									</Draggable>
								</div>
							</div>
						)}
					</Droppable>
				))}
			</div>
		</div>
	)
}

export default Fan
