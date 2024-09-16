import cn from 'clsx'

import Card from '@/pages/game/ui/components/Card'

import avatar from '@/shared/assets/tapps.png'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'
import { IGameSession } from '@/entities/game/model/game.interface'
import { TPlayer } from '@/entities/player/model/player.model'
import { formatPhotoUrl } from '@/shared/lib/format-photo-url'

interface IProps {
	rivals: TPlayer[]
	gameInfo: IGameSession
}

export function Rivals({ rivals, gameInfo }: IProps) {
	const maxRivalCardsAngleDegrees = 30

	return (
		<div className='absolute left-0 top-0 -z-10 h-full w-full'>
			{rivals.map((rival: TPlayer, rivalIndex) => (
				<div
					className='relative flex flex-col items-center gap-base-x1'
					key={rival.username}
				>
					{rival.index === gameInfo.defender_id && (
						<Icon
							size={25}
							icon='defending'
							className='absolute -bottom-base-x2 left-36 z-40 translate-x-1/2'
						/>
					)}
					{rival.index === gameInfo.attacker_id && (
						<Icon
							size={25}
							icon='attack'
							className='absolute -bottom-base-x2 -left-base-x2 z-40'
						/>
					)}
					<Typography variant='text'>{rival.username}</Typography>
					<div className='relative z-30'>
						<img
							src={
								rival.photo_path
									? formatPhotoUrl(rival.photo_path)
									: avatar
							}
							alt=''
							className='h-base-x7 w-base-x7 rounded-base-x1'
						/>
					</div>
					<Typography
						variant='text'
						className='absolute -bottom-[40px] left-[50%] z-50 flex h-base-x6 w-base-x6 -translate-x-[50%] items-center justify-center rounded-full border-2 border-blue bg-white font-bold text-blue'
					>
						{rival.count_card_in_hand}
					</Typography>
					<div className='absolute -left-8 top-[90px] z-20 w-full translate-x-1/2'>
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
