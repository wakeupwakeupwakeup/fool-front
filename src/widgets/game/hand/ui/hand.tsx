import { Card } from '@/widgets/game/card/ui/card'
import Icon from '@/shared/ui/icon/Icon'
import { formatPhotoUrl } from '@/shared/lib/format-photo-url'
import avatar from '@/shared/assets/tapps.png'
import { TPlayer } from '@/entities/player/model/player.model'
import { IGameSession } from '@/entities/game/model/game.interface'

interface IHandProps {
	playerCards: string[]
	playerData: TPlayer
	gameData: IGameSession
}
export function Hand({ playerCards, playerData, gameData }: IHandProps) {
	return (
		<div className='absolute bottom-0 h-1/3 w-full'>
			<div className='relative left-6'>
				{playerData.index === gameData.defender_id && (
					<Icon
						size={25}
						icon='defending'
						className='relative -bottom-base-x2 -left-base-x2 z-40'
					/>
				)}
				{playerData.index === gameData.attacker_id && (
					<Icon
						size={25}
						icon='attack'
						className='absolute -bottom-base-x2 -left-base-x2 z-40'
					/>
				)}
				<img
					src={
						playerData.photo_path
							? formatPhotoUrl(playerData.photo_path)
							: avatar
					}
					alt={playerData.username}
					className='aspect-square h-base-x7 rounded-base-x1'
				/>
			</div>
			<div className='absolute bottom-32 left-10 flex w-max translate-x-1/3'>
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
