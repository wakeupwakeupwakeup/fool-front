import { useEffect } from 'react'
import { Pack } from './components'
import { useSelector } from 'react-redux'
import { TPlayer } from '@/entities/player/model/types/player.model'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import Loader from '@/shared/ui/loader/Loader'
import { DraggingCard } from '@/entities/game/ui/card/ui/dragging-card'
import { useNavigate } from 'react-router-dom'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'
import { GameTable } from '@/entities/game/ui/table/ui/game-table'
import Layout from '@/shared/ui/layout/Layout'
import { Hand } from '@/widgets/hand'
import { RootState } from '@/app/store'
import { Fall } from '@/pages/game/ui/components'
import { Rivals } from '@/widgets/rivals/ui/Rivals'
import { DealCards } from '@/widgets/deal-cards/ui/deal-cards'

const mobilePlatforms = ['android', 'ios', 'android_x']

export function GamePage() {
	const navigate = useNavigate()
	const { platform } = retrieveLaunchParams()

	// Информация о состоянии игры от сервера
	const gameData = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)

	const isConnected = useSelector(
		(state: RootState) => state.socket.isConnected,
	)

	const finished =
		useSelector((state: RootState) => state.navigation.path) === '/home'

	// ID текущего игрока
	const chatId = localStorage.getItem('chat_id')

	// Информация о состоянии игрока
	const currentPlayer: TPlayer = gameData.players
		.map((player, index) => ({ ...player, index }))
		.find((player: TPlayer) => player.chat_id === chatId)
	console.log('DEV | CURRENT PLAYER: ', currentPlayer)

	// Информация о состоянии соперников
	const rivals: TPlayer[] = gameData.players
		.map((player, index) => ({ ...player, index })) // Добавляем индекс в объект
		.filter(player => player.chat_id !== currentPlayer?.chat_id)

	// useEffect(() => {
	// 	if (finished) {
	// 		navigate('/results')
	// 	}
	// }, [finished, navigate])

	if (!isConnected) return <Loader />

	return (
		isConnected &&
		currentPlayer && (
			<DndProvider
				backend={
					mobilePlatforms.includes(platform)
						? TouchBackend
						: HTML5Backend
				}
				options={{ enableMouseEvents: true }}
			>
				<Layout
					noLogo
					className='flex h-full select-none flex-col justify-between'
				>
					<DraggingCard />
					<Rivals rivals={rivals} gameData={gameData} />
					<GameTable />
					{currentPlayer.card_in_hand && (
						<Hand
							playerCards={currentPlayer.card_in_hand}
							gameData={gameData}
							playerData={currentPlayer}
						/>
					)}
					<div className='absolute left-1/2 top-[136px] flex -translate-x-1/2 gap-base-x2'>
						{gameData.currency && (
							<Icon
								size={26}
								icon={
									gameData.currency === 'Ton'
										? 'ton'
										: gameData.currency.toLowerCase()
								}
							/>
						)}
						<Typography variant='h1'>{gameData.bet}</Typography>
					</div>
					{/*<Fall*/}
					{/*	beatDeckLength={*/}
					{/*		36 -*/}
					{/*		(gameData.game_board.length +*/}
					{/*			gameData.count_card_in_deck! +*/}
					{/*			totalCardsInHands)*/}
					{/*	}*/}
					{/*/>*/}
					{/*<DealCards />*/}
					<Pack
						trumpCard={gameData.trump}
						remainingDeckLength={gameData.count_card_in_deck}
					/>
				</Layout>
			</DndProvider>
		)
	)
}
