import Icon from '@/shared/ui/icon/Icon'
import { formatPhotoUrl } from '@/entities/user/lib/format-photo-url'
import avatar from '@/shared/assets/tapps.png'
import { TPlayer } from '@/entities/player/model/types/player.model'
import { IGameSession } from '@/entities/game/model/types/game.model'
import cn from 'clsx'
import { Typography } from '@/shared/ui/typography'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'
import { getPlayerIndex } from '@/entities/player'
import { RootState } from '@/app/store'
import { sendAction } from '@/entities/socket/api/player.actions'

interface IPlayerIconProps {
	playerData: TPlayer
	gameData: IGameSession
	className?: string
}

export function PlayerIcon({
	playerData,
	gameData,
	className,
}: Readonly<IPlayerIconProps>) {
	const [timeLeft, setTimeLeft] = useState(2000)
	const playerHasTimer = useSelector(
		(state: RootState) => state.localGameData.playerTimerId,
	)

	const chatId = localStorage.getItem('chat_id')!

	useEffect(() => {
		// Если у игрока есть таймер, сбрасываем таймер до 20 секунд
		if (playerHasTimer === playerData.index) {
			setTimeLeft(20) // Сбрасываем таймер при изменении playerHasTimer

			const intervalId = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime === 1) {
						// Если время истекло
						if (
							playerHasTimer ===
							getPlayerIndex(chatId, gameData.players)
						) {
							sendAction(SocketConnection.getInstance(), {
								type: 'TIMEOUT',
							})
						}
						clearInterval(intervalId) // Очищаем таймер
						return 0 // Таймер обнуляется
					} else {
						return prevTime - 1 // Уменьшаем время на 1 секунду
					}
				})
			}, 1000)

			return () => clearInterval(intervalId) // Очищаем таймер при размонтировании
		}
	}, [playerHasTimer, playerData.index, chatId, gameData.players])

	// Устанавливаем фиксированную ширину полосы (например, 300px)
	const maxWidth = 64

	// Вычисляем ширину полосы относительно оставшегося времени
	const currentWidth = (timeLeft / 20) * maxWidth

	return (
		<div className={cn('relative top-0', className)}>
			{playerData.index === gameData.defender_id && (
				<Icon
					size={25}
					icon='defending'
					className='absolute -bottom-base-x2 -left-base-x2 z-40'
				/>
			)}
			{playerData.index === gameData.attacker_id && (
				<Icon
					size={25}
					icon='attack'
					className='absolute -bottom-base-x2 -left-base-x2 z-40'
				/>
			)}
			{playerData.index !== gameData.defender_id &&
				gameData.game_board.length !== 0 &&
				playerData.finish_cycle && (
					<Typography
						variant='text'
						className='absolute left-2 top-2 z-30 text-lg font-bold text-yellow'
					>
						Пас
					</Typography>
				)}
			{playerData.index === gameData.defender_id &&
				playerData.finish_cycle && (
					<Typography
						variant='text'
						className='absolute left-2 top-2 z-30 text-lg font-bold text-red'
					>
						Беру
					</Typography>
				)}
			{playerHasTimer === playerData.index && timeLeft > 0 && (
				<div
					className='absolute'
					style={{
						height: '3px',
						width: `${maxWidth}px`, // Фиксированная ширина контейнера
						backgroundColor: 'lightgray',
						borderRadius: '5px',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							height: '100%',
							width: `${currentWidth}px`, // Ширина полосы в пикселях
							backgroundColor:
								currentWidth > maxWidth * 0.3 ? 'green' : 'red', // Меняем цвет в зависимости от оставшегося времени
							transition: 'width 1s linear', // Плавное уменьшение ширины
						}}
					></div>
				</div>
			)}
			<div>
				<img
					src={
						playerData.photo_path
							? formatPhotoUrl(playerData.photo_path)
							: avatar
					}
					alt={playerData.username}
					style={{
						filter: playerData.disconnect ? 'blur(2px)' : 'none',
					}}
					className='aspect-square h-base-x7 w-base-x7 max-w-none rounded-base-x1'
				/>
			</div>
		</div>
	)
}
