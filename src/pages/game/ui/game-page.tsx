import { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId } from '@/entities/auth/lib/auth.helper'
import { Pack, Rivals } from './components'
import Layout from '@/app/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app'
import { TPlayer } from '@/entities/player/model/player.model'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { GameTable } from '@/widgets/game/table/ui/game-table'
import { Hand } from '@/widgets/game/hand/ui/hand'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { retrieveLaunchParams, useInitData } from '@telegram-apps/sdk-react'
import { parseInviteString } from '@/shared/lib/parse-start-param'
import { initSocket } from '@/entities/socket/model/store/socket.slice'
import { useSessionData } from '@/entities/socket/lib/hooks/use-session-data'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'
import Loader from '@/shared/ui/loader/Loader'
import { DraggingCard } from '@/widgets/game/card/ui/dragging-card'

const mobilePlatforms = ['android', 'ios', 'android_x']

export function GamePage(): ReactElement {
	// Информация о состоянии игры от сервера
	const gameData = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)

	// ID игрока
	const chat_id = getId()

	// Информация о состоянии игрока
	const currentPlayer: TPlayer = gameData.players
		.map((player, index) => ({ ...player, index }))
		.find((player: TPlayer) => player.chat_id === chat_id)
	console.log('DEV | CURRENT PLAYER: ', currentPlayer)

	// Информация о состоянии соперников
	const rivals: TPlayer[] = gameData.players
		.map((player, index) => ({ ...player, index })) // Добавляем индекс в объект
		.filter(player => player.chat_id !== currentPlayer?.chat_id)
	console.log('DEV | RIVALS: ', rivals)

	const { platform } = retrieveLaunchParams()

	if (!SocketConnection.getInstance()) return <Loader />

	return (
		gameData && (
			<DndProvider
				backend={
					mobilePlatforms.includes(platform)
						? TouchBackend
						: HTML5Backend
				}
				options={{ enableMouseEvents: true }}
			>
				<Layout noLogo className='absolute h-full select-none'>
					<DraggingCard />
					<GameTable />
					<Hand
						playerCards={currentPlayer.card_in_hand}
						gameData={gameData}
						playerData={currentPlayer}
					/>
					<Rivals rivals={rivals} gameData={gameData} />
					{/*<div className='absolute top-40 flex gap-base-x2'>*/}
					{/*	{gameData.currency && (*/}
					{/*		<Icon size={26} icon={gameData.currency} />*/}
					{/*	)}*/}
					{/*	<Typography variant='h1'>{gameData.bet}</Typography>*/}
					{/*</div>*/}
					{/*/!*<Fall beatDeckLength={beatDeckLength} />*!/*/}
					<Pack
						trumpCard={gameData.trump}
						remainingDeckLength={gameData.count_card_in_deck}
					/>
				</Layout>
			</DndProvider>
		)
	)
}
