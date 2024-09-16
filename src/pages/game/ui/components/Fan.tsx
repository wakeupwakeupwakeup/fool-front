import { Draggable, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import avatar from '@/shared/assets/tapps.png'
import DraggableCard from './DraggableCard'
import Icon from '@/shared/ui/icon/Icon'
import { Button } from '@/shared/ui/button'
import { TPlayer } from '@/entities/player/model/player.model'
import { formatPhotoUrl } from '@/shared/lib/format-photo-url'
import { IGameSession } from '@/entities/game/model/game.interface'

interface IProps {
	onSubmit?: () => void
	buttonText: string
	player: TPlayer
	gameInfo: IGameSession
}

export function Fan({ onSubmit, buttonText, player, gameInfo }: IProps) {
	const [draggableCard, setDraggableCard] = useState<string>()
	const [newCards, setNewCards] = useState<string[]>(player.card_in_hand)

	const calculatorCardsLength = (isDragging: boolean, card: string) => {
		if (isDragging && draggableCard !== card) {
			setDraggableCard(card)
			setNewCards(player.card_in_hand.filter(item => item !== card))
		} else {
			setDraggableCard('')
			setNewCards(player.card_in_hand)
		}
	}

	const calc = index => {
		return draggableCard
			? player.card_in_hand.findIndex(card => card === draggableCard) +
					1 ===
				player.card_in_hand.length
				? index
				: player.card_in_hand.findIndex(
							card => card === draggableCard,
					  ) === 0
					? index - 1
					: player.card_in_hand.findIndex(
								card => card === draggableCard,
						  ) > index
						? index
						: index - 1
			: index
	}
	useEffect(() => {
		setNewCards(player.card_in_hand)
	}, [player.card_in_hand])

	return (
		<div className='relative w-full'>
			<div className='relative bottom-[90px] flex w-full justify-between'>
				{player.index === gameInfo.defender_id && (
					<Icon
						size={25}
						icon='defending'
						className='absolute -left-base-x2 -top-base-x2 z-40'
					/>
				)}
				{player.index === gameInfo.attacker_id && (
					<Icon
						size={25}
						icon='attack'
						className='absolute -left-base-x2 -top-base-x2 z-40'
					/>
				)}
				<img
					src={
						player.photo_path
							? formatPhotoUrl(player.photo_path)
							: avatar
					}
					alt=''
					className='h-base-x7 w-base-x7 rounded-base-x1'
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
				{player.card_in_hand.map((card: string, index) => (
					<Droppable
						direction='horizontal'
						key={index}
						droppableId={`droppable-card-${index}`}
					>
						{(provided, _) => (
							<div
								className='absolute transition-all ease-linear'
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
												total={
													player.count_card_in_hand
												}
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
