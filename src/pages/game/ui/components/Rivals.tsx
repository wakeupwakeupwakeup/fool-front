import Card from '@/pages/game/ui/components/Card'
import { Typography } from '@/shared/ui/typography'
import { IGameSession } from '@/entities/game/model/game.interface'
import { TPlayer } from '@/entities/player/model/player.model'
import { formatPhotoUrl } from '@/shared/lib/format-photo-url'
import { PlayerIcon } from '@/widgets/game/player-icon/ui/player-icon'

interface IProps {
	rivals: TPlayer[]
	gameData: IGameSession
}

export function Rivals({ rivals, gameData }: IProps) {
	const maxRivalCardsAngleDegrees = 30

	return (
		<div className='absolute left-0 top-0 -z-10 h-full w-full'>
			{rivals.map((rival: TPlayer) => (
				<div
					className='relative flex flex-col items-center gap-base-x1'
					key={rival.username}
				>
					<PlayerIcon playerData={rival} gameData={gameData} />
					<Typography variant='text' className='relative top-6'>
						{rival.username}
					</Typography>
					<Typography
						variant='text'
						className='absolute left-[60%] top-[40px] z-50 flex h-base-x6 w-base-x6 -translate-x-[50%] items-center justify-center rounded-full border-2 border-blue bg-white font-bold text-blue'
					>
						{rival.count_card_in_hand}
					</Typography>
					<div className='absolute -left-6 top-[14px] z-20 w-full translate-x-1/2'>
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
									.map((item, index) => (
										<Card
											size='small'
											position='bottom'
											key={index}
											className={`card-index-${index}`}
											style={{
												rotate: `${
													(90 /
														rival.count_card_in_hand) *
														index -
													maxRivalCardsAngleDegrees
												}deg`,
												transformOrigin: 'center 10px',
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

export default Rivals
