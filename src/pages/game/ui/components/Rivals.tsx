import cn from 'clsx'
import { FC } from 'react'

import Card from '@/pages/game/ui/components/Card'
import { ICurrentPlayer } from '@/pages/game/model/game.interface'

import { getGame } from '@/entities/game/lib/game.helper'

import avatar from '@/shared/assets/tapps.png'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	rivals: ICurrentPlayer[]
	handlerShowModal: (place: number) => void
	defendingPlayer: string
	attackPlayer: string
}

const Rivals: FC<IProps> = ({
	rivals,
	handlerShowModal,
	defendingPlayer,
	attackPlayer,
}) => {
	const game = getGame()
	const countRivals: number[] =
		rivals.length > 0
			? Array(game.playersNumber - 1 - rivals.length).fill(1)
			: Array(game.playersNumber - 1).fill(1)
	const maxRivalCardsAngleDegrees = 30
	const placeRival =
		rivals.length > 0 ? Math.max(...rivals.map(obj => obj.place)) + 1 : 2
	return (
		<div
			className={cn(
				'flex w-full items-end',
				game.playersNumber > 2 ? 'justify-between' : 'justify-center',
			)}
		>
			{countRivals.length > 0 &&
				countRivals.map((item, index) => (
					<button
						key={index}
						onClick={() => handlerShowModal(index + 2)}
						className='flex h-base-x7 w-base-x7 items-center justify-center rounded-base-x1 border border-dashed'
					>
						<Icon size={24} icon='plus' color='white' />
					</button>
				))}
			{rivals.map((rival, rivalIndex) => (
				<div
					className='relative flex flex-col items-center gap-base-x1'
					key={rival.username}
				>
					{defendingPlayer === rival.tg_id && (
						<Icon
							size={25}
							icon='defending'
							className='absolute -bottom-base-x2 -left-base-x2 z-40'
						/>
					)}
					{attackPlayer === rival.tg_id && (
						<Icon
							size={25}
							icon='attack'
							className='absolute -bottom-base-x2 -left-base-x2 z-40'
						/>
					)}
					<Typography variant='text'>{rival.username}</Typography>
					<div className='relative z-30'>
						<img
							src={rival?.photo_url ? rival.photo_url : avatar}
							alt=''
							className='h-base-x7 w-base-x7 rounded-base-x1'
						/>
					</div>
					{typeof rival?.countCards === 'number' && (
						<Typography
							variant='text'
							className='absolute -bottom-[40px] left-[50%] z-50 flex h-base-x6 w-base-x6 -translate-x-[50%] items-center justify-center rounded-full border-2 border-blue bg-white font-bold text-blue'
						>
							{rival.countCards}
						</Typography>
					)}
					<div
						id={'Cards' + rivalIndex}
						className='absolute left-[10px] top-[60px] z-20 w-full'
					>
						{rival.countCards ? (
							rival.countCards === 1 ? (
								<Card
									size='small'
									position='bottom'
									key={0}
									style={{ rotate: '0deg', zIndex: 20 }}
								/>
							) : (
								Array(rival.countCards)
									.fill(1)
									.map((item, index) => (
										<Card
											size='small'
											position='bottom'
											key={index}
											className={`card-index-${index}`}
											style={{
												rotate: `${
													(90 / rival.countCards) *
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
