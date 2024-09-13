import { Draggable, Droppable } from '@hello-pangea/dnd'
import { FC, useEffect, useState } from 'react'

import { getId } from '@/entities/auth/lib/auth.helper'

import avatar from '@/shared/assets/tapps.png'

import { ICurrentPlayer } from '../../model/game.interface'

import DraggableCard from './DraggableCard'
import Icon from '@/shared/ui/icon/Icon'
import { Button } from '@/shared/ui/button'

interface IProps {
	cards: string[]
	onSubmit: () => void
	buttonText: string
	defendingPlayer: string
	player: ICurrentPlayer
	attackPlayer: string
}

const Fan: FC<IProps> = ({
	cards,
	onSubmit,
	buttonText,
	player,
	defendingPlayer,
	attackPlayer,
}) => {
	const tg_id = getId()
	const [draggableCard, setDraggableCard] = useState<string>()
	const [newCards, setNewCards] = useState<string[]>(cards)
	const calculatorCardsLength = (isDragging, card) => {
		if (isDragging && draggableCard !== card) {
			setDraggableCard(card)
			setNewCards(cards.filter(item => item !== card))
		} else {
			setDraggableCard('')
			setNewCards(cards)
		}
	}

	const calc = index => {
		return draggableCard
			? cards.findIndex(card => card === draggableCard) + 1 ===
			  cards.length
				? index
				: cards.findIndex(card => card === draggableCard) === 0
				? index - 1
				: cards.findIndex(card => card === draggableCard) > index
				? index
				: index - 1
			: index
	}
	useEffect(() => {
		setNewCards(cards)
	}, [cards])
	return (
		<div className='relative w-full'>
			<div className='relative w-full bottom-[90px] flex justify-between'>
				{Number(defendingPlayer) === Number(tg_id) && (
					<Icon
						size={25}
						icon='defending'
						className='absolute -top-base-x2 -left-base-x2 z-40'
					/>
				)}
				{Number(attackPlayer) === Number(tg_id) && (
					<Icon
						size={25}
						icon='attack'
						className='absolute -top-base-x2 -left-base-x2 z-40'
					/>
				)}
				<img
					src={player?.photo_url ? player.photo_url : avatar}
					alt=''
					className='w-base-x7 h-base-x7 rounded-base-x1'
				/>
				{!!buttonText && (
					<Button
						className='ml-auto rounded-full border border-white'
						style={{
							width: 64,
							height: 64,
						}}
						onClick={onSubmit}
					>
						{buttonText}
					</Button>
				)}
			</div>
			<div className='absolute bottom-[70px] left-[50%] flex flex-row items-center justify-center'>
				{cards.map((card, index) => (
					<Droppable
						direction='horizontal'
						key={index}
						droppableId={`droppable-card-${index}`}
					>
						{(provided, _) => (
							<div
								className='absolute ease-linear transition-all'
								style={{
									zIndex: index + 1,
									left: `${
										(calc(index) - newCards.length / 2) *
										(240 / newCards.length)
									}px`,
								}}
							>
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{provided.placeholder}
									<Draggable
										index={index}
										draggableId={'draggable-' + index}
									>
										{(
											DraggableProvided,
											DraggableSnapshot,
										) => (
											<DraggableCard
												type={card}
												num={index}
												calculatorCardsLength={
													calculatorCardsLength
												}
												provided={DraggableProvided}
												draggableCard={draggableCard}
												snapshot={DraggableSnapshot}
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
