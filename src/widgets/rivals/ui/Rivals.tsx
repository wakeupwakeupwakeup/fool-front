import Card from '@/pages/game/ui/components/Card'
import { Typography } from '@/shared/ui/typography'
import {
	formatPlayerNickname,
	getPlayerIndex,
	PlayerIcon,
	TPlayer,
} from '@/entities/player'
import { IGameSession } from '@/entities/game/model/types/game.model'

interface IProps {
	rivals: TPlayer[]
	gameData: IGameSession
}

export function Rivals({ rivals, gameData }: Readonly<IProps>) {
	const myId = localStorage.getItem('chat_id')!
	const myIndex = getPlayerIndex(myId, gameData.players)
	const playerAfterMe = rivals.findIndex(player => player.index > myIndex)

	if (playerAfterMe !== -1) {
		rivals = rivals
			.slice(playerAfterMe)
			.concat(rivals.slice(0, playerAfterMe))
	}

	return (
		<div className='flex w-full justify-evenly'>
			{rivals.map((rival: TPlayer) => (
				<div
					className='flex flex-col items-center'
					key={rival.username}
				>
					<Typography variant='text'>
						{formatPlayerNickname(rival.username)}
					</Typography>

					<PlayerIcon playerData={rival} gameData={gameData} />

					<Typography
						variant='text'
						className='absolute top-[96px] z-50 flex h-base-x5 w-base-x5 items-center justify-center rounded-full border-2 border-blue bg-white font-bold text-blue'
					>
						{rival.count_card_in_hand}
					</Typography>

					<div className='relative -left-[18px] -top-[32px] -z-10 w-full translate-x-1/2'>
						{rival.count_card_in_hand ? (
							rival.count_card_in_hand === 1 ? (
								<Card
									size='small'
									position='bottom'
									key={0}
									style={{ rotate: '0deg', zIndex: 20 }}
								/>
							) : (
								Array(rival.count_card_in_hand)
									.fill(1)
									.map((_, index) => (
										<Card
											size='small'
											position='bottom'
											key={index}
											className={`card-index-${index}`}
											style={{
												rotate: `${(index - (rival.count_card_in_hand - 1) / 2) * 7}deg`,
												left: `${index * -2.5}px`,
												transformOrigin: 'center 0',
												zIndex: 20 + index,
											}}
										/>
									))
							)
						) : null}
					</div>
				</div>
			))}
		</div>
	)
}
