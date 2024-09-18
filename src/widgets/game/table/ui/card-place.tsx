import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app'
import { ReactElement } from 'react'
import cn from 'clsx'
import {
	addCardToBoard,
	putDefendingCard,
	removeCardFromHand,
} from '@/entities/game/model/game-session.slice'
import { getPlayerIndex } from '@/entities/player/lib/get-player-index'
import { sendAction } from '@/entities/player/api/player.actions'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'

interface ICardPlaceProps {
	attackingCard?: ReactElement
	defendingCard?: ReactElement
}

export function CardPlace({ attackingCard, defendingCard }: ICardPlaceProps) {
	const dispatch = useDispatch()
	const gameData = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)
	const droppedCard = useSelector(
		(state: RootState) => state.localGameData.draggingCard,
	)
	const chatId = localStorage.getItem('chat_id')!

	const [, drop] = useDrop(
		() => ({
			accept: 'card',
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
		<div className='relative'>
			<div
				className={cn(
					!attackingCard &&
						'rounded-md border border-dotted border-white',
					'absolute h-[90px] w-[60px] -rotate-[12deg]',
				)}
				ref={drop}
			>
				{attackingCard}
			</div>
			{attackingCard && (
				<div
					className={cn(
						!defendingCard &&
							'rounded-md border border-dotted border-green',
						'absolute z-20 h-[90px] w-[60px] rotate-[12deg]',
					)}
					ref={drop}
				>
					{defendingCard}
				</div>
			)}
		</div>
	)
}
