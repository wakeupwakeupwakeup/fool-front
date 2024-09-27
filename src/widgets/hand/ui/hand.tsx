import { Card } from '@/entities/game/ui/card/ui/card'
import { TPlayer } from '@/entities/player/model/types/player.model'
import { IGameSession } from '@/entities/game/model/types/game.model'
import { Button } from '@/shared/ui/button'
import { isAllCardBeaten } from '@/entities/game/lib/is-all-card-beaten'
import { useDispatch } from 'react-redux'
import { finishPlayerCycle } from '@/entities/game/model/store/game-session.slice'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'
import { getPlayerIndex, PlayerIcon } from '@/entities/player'
import { sendAction } from '@/entities/socket/api/player.actions'

interface IHandProps {
	playerCards: string[]
	playerData: TPlayer
	gameData: IGameSession
}
export function Hand({
	playerCards,
	playerData,
	gameData,
}: Readonly<IHandProps>) {
	const dispatcher = useDispatch()
	const chatId = localStorage.getItem('chat_id')!
	const playerIndex = getPlayerIndex(chatId, gameData.players)
	const currentPlayer = gameData.players[playerIndex]

	function takeCards() {
		dispatcher(finishPlayerCycle(chatId))
		sendAction(SocketConnection.getInstance(), {
			type: 'TAKE',
		})
	}

	function playerPass() {
		dispatcher(finishPlayerCycle(chatId))
		sendAction(SocketConnection.getInstance(), {
			type: 'PASS',
		})
	}

	return (
		<div className='flex h-full w-full flex-1 flex-col'>
			<div className='mt-4 flex w-full justify-between px-4'>
				<PlayerIcon playerData={playerData} gameData={gameData} />
				{playerIndex === gameData.defender_id &&
					!isAllCardBeaten(gameData.game_board) &&
					!currentPlayer.finish_cycle && (
						<Button
							className='rounded-full border border-white'
							style={{
								width: 64,
								height: 64,
							}}
							onClick={() => takeCards()}
						>
							Взять
						</Button>
					)}
				{playerIndex === gameData.attacker_id &&
					!!gameData.game_board.length &&
					!currentPlayer.finish_cycle &&
					(isAllCardBeaten(gameData.game_board) ||
						gameData.players[gameData.defender_id!]
							.finish_cycle) && (
						<Button
							className='rounded-full border border-white'
							style={{
								width: 64,
								height: 64,
							}}
							onClick={() => playerPass()}
						>
							Пас
						</Button>
					)}
			</div>

			<div className='z-50 flex items-center justify-center'>
				{currentPlayer.card_in_hand.map((suit, index) => (
					<Card
						position='hand'
						key={suit}
						suit={suit}
						index={index}
						totalCards={playerCards.length}
					/>
				))}
			</div>
		</div>
	)
}
