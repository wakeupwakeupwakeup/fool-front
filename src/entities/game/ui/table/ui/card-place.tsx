import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ReactElement } from 'react'
import cn from 'clsx'
import {
	addCardToBoard,
	putDefendingCard,
	removeCardFromHand,
} from '@/entities/game/model/store/game-session.slice'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'
import { RootState } from '@/app/store'
import { getPlayerIndex, TPlayer } from '@/entities/player'
import { sendAction } from '@/entities/socket/api/player.actions'

interface ICardPlaceProps {
	attackingCard?: ReactElement
	defendingCard?: ReactElement
}

export function CardPlace({
	attackingCard,
	defendingCard,
}: Readonly<ICardPlaceProps>) {
	const dispatch = useDispatch()
	const gameData = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)
	const droppedCard = useSelector(
		(state: RootState) => state.localGameData.draggingCard,
	)
	const chatId = localStorage.getItem('chat_id')!

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'card',
			collect: monitor => ({
				isOver: monitor.isOver(),
			}),
			drop: () => {
				if (
					droppedCard &&
					gameData.attacker_id ===
						getPlayerIndex(chatId, gameData.players)
				) {
					sendAction(SocketConnection.getInstance(), {
						type: 'ATTACK',
						payload: { attacking_card: droppedCard },
					})
					dispatch(addCardToBoard({ [droppedCard]: '' }))
					dispatch(removeCardFromHand({ card: droppedCard, chatId }))
				} else if (
					droppedCard &&
					gameData.defender_id ===
						getPlayerIndex(chatId, gameData.players) &&
					attackingCard
				) {
					sendAction(SocketConnection.getInstance(), {
						type: 'DEFEND',
						payload: {
							attacking_card: attackingCard.props.suit,
							card: droppedCard,
						},
					})
					dispatch(
						putDefendingCard({
							attackingCard: attackingCard.props.suit,
							card: droppedCard,
						}),
					)
					dispatch(removeCardFromHand({ card: droppedCard, chatId }))
				}
			},
		}),
		[droppedCard],
	)

	return (
		<div className='relative w-1/3'>
			<div className='flex h-full items-center justify-center' ref={drop}>
				<div
					className={cn(
						!attackingCard &&
							gameData.defender_id !==
								getPlayerIndex(chatId, gameData.players) &&
							'rounded-md border border-dashed border-white',
						'absolute h-[120px] w-[80px] -rotate-[12deg]',
					)}
					style={{
						backgroundColor:
							isOver && !defendingCard
								? 'rgba(80, 235, 50, 0.5)'
								: '',
					}}
				>
					{attackingCard}
				</div>
			</div>
			{attackingCard && (
				<div
					className='absolute top-0 flex h-full w-full items-center justify-center'
					ref={drop}
				>
					<div
						className={cn(
							!attackingCard &&
								defendingCard &&
								gameData.defender_id ===
									getPlayerIndex(chatId, gameData.players) &&
								'rounded-md border border-dashed border-green',
							'absolute z-20 h-[120px] w-[80px] rotate-[12deg]',
						)}
						ref={drop}
					>
						{defendingCard}
					</div>
				</div>
			)}
		</div>
	)
}
