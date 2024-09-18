import { Card } from '@/widgets/game/card/ui/card'
import { TPlayer } from '@/entities/player/model/player.model'
import { IGameSession } from '@/entities/game/model/game.interface'
import { PlayerIcon } from '@/widgets/game/player-icon/ui/player-icon'
import { Button } from '@/shared/ui/button'
import { getPlayerIndex } from '@/entities/player/lib/get-player-index'
import { isAllCardBeaten } from '@/entities/game/lib/is-all-card-beaten'
import { useDispatch } from 'react-redux'
import { finishPlayerCycle } from '@/entities/game/model/game-session.slice'
import { sendAction } from '@/entities/player/api/player.actions'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'

interface IHandProps {
	playerCards: string[]
	playerData: TPlayer
	gameData: IGameSession
}
export function Hand({ playerCards, playerData, gameData }: IHandProps) {
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
		<div className='absolute bottom-0 z-50 h-1/3 w-full'>
			<PlayerIcon
				playerData={playerData}
				gameData={gameData}
				className='left-4'
			/>
			<div className='relative bottom-[45px] z-50 flex w-full justify-between'>
				{playerIndex === gameData.defender_id &&
					!isAllCardBeaten(gameData.game_board) &&
					!currentPlayer.finish_cycle && (
						<Button
							className='ml-auto rounded-full border border-white'
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
					gameData.game_board.length &&
					!currentPlayer.finish_cycle && (
						<Button
							className='ml-auto rounded-full border border-white'
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
			<div className='absolute bottom-24 left-[58px] flex'>
				{playerCards.map((suit, index) => (
					<Card
						position='hand'
						key={index}
						suit={suit}
						index={index}
						totalCards={playerCards.length}
					/>
				))}
			</div>
		</div>
	)
}
