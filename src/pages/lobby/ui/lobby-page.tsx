import { ReactElement, useEffect } from 'react'
import Layout from '@/app/layout/Layout'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@/shared/ui/typography'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app'
import { useSessionData } from '@/entities/socket/lib/hooks/use-session-data'
import { initSocket } from '@/entities/socket/model/socket.slice'
import { API_URL } from '@/shared/api/api.config'
import { TPlayer } from '@/entities/player/model/player.model'
import { SocketConnection } from '@/entities/socket/model/socket-factory'
import cn from 'clsx'
import { sendAction } from '@/entities/player/lib/player.actions'
import { useInitData, useUtils } from '@telegram-apps/sdk-react'

export function LobbyPage(): ReactElement {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { data: gameInfo } = useSelector(
		(state: RootState) => state.remoteGameData,
	)
	const path = useSelector((state: RootState) => state.navigation.path)
	const initData = useInitData()
	const { uuid, chatId, initDataRaw } = useSessionData()
	const local_uuid = uuid || localStorage.getItem('game_uuid')
	const utils = useUtils()

	useEffect(() => {
		console.log(local_uuid)
		if (initDataRaw && chatId) {
			if (local_uuid) {
				dispatch(
					initSocket({
						gameUuid: local_uuid,
						initData: initDataRaw,
						chatId,
					}),
				)
			} else {
				console.error('DEV | GAME UUID WAS NOT PROVIDED')
			}
		} else {
			console.error('DEV | MISSING DATA FOR WEBSOCKET OPENING')
		}
	}, [uuid, initData?.startParam])

	useEffect(() => {
		console.log('DEV | GAME INFO: ', gameInfo)
		if (path === '/game') navigate(path)
	}, [gameInfo, path])

	return (
		<Layout
			className='flex h-full flex-col justify-between'
			header={{ icon: 'fan', title: 'Ожидание' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button
						onClick={() =>
							sendAction(SocketConnection.getInstance(), {
								type: 'SET_READY',
							})
						}
					>
						Готов
					</Button>
					<Button
						onClick={() => navigate('/create-game')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
		>
			<div className='text-center'>
				<Typography variant='h1'>Параметры игры:</Typography>
				<Typography variant='text'>Ставка: {gameInfo.bet}</Typography>
				<Typography variant='text'>
					Тип игры: {gameInfo.game_type}
				</Typography>
				<Typography variant='text'>
					Количество игроков: {gameInfo.player_count}
				</Typography>
			</div>
			<div>
				<Typography className='text-center' variant='h1'>
					Игроки:
				</Typography>
				{gameInfo.player_count && gameInfo.players.length > 0 && (
					<div className='mt-4 flex justify-evenly gap-2'>
						{gameInfo.players.map((player: TPlayer) => (
							<div
								className={cn(
									player.is_ready
										? 'border-2 border-green'
										: 'border-2 border-red',
									'flex flex-col items-center rounded-xl',
								)}
								key={player.chat_id}
							>
								<img
									src={API_URL + 'files/' + player.photo_path}
									alt={player.username}
									className='w-base-x7 rounded-3xl'
								/>
							</div>
						))}
						{gameInfo.players.length < gameInfo.player_count ? (
							<div
								onClick={() => {
									utils.openTelegramLink(
										`https://t.me/share/url?url=https://t.me/tonfool_dev_bot/app?startapp=invite_${chatId}_game_${local_uuid}`,
									)
								}}
								className='flex aspect-square w-base-x7 items-center justify-center rounded-xl border-2 border-dotted border-white'
							>
								<img
									className='w-base-x6'
									src='/icons/add_cross.svg'
									alt='Add player'
								/>
							</div>
						) : null}
					</div>
				)}
			</div>
		</Layout>
	)
}
