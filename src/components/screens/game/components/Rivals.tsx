import { FC } from 'react'

import Card from '@/components/screens/game/components/Card'
import { IRival } from '@/components/screens/game/game.interface'
import { Icon, Typography } from '@/components/ui'

import { getGame } from '@/services/game/game.helper'

import avatar from '@/assets/tapps.png'

interface IProps {
	rivals: IRival[]
	handlerShowModal: (place: number) => void
	defendingPlayer: number
	attackPlayer: number
}

const Rivals: FC<IProps> = ({
	rivals,
	handlerShowModal,
	defendingPlayer,
	attackPlayer
}) => {
	const game = getGame()
	const countRivals: number[] = Array(game.num_players - 1).fill(1)
	const maxRivalCardsAngleDegrees = 30

	return (
		<div className='flex justify-center w-full'>
			{countRivals.length > rivals.length &&
				countRivals.map((item, index) => (
					<button
						key={index}
						onClick={() => handlerShowModal(item + 1)}
						className='w-base-x7 h-base-x7 rounded-base-x1 border border-dashed flex items-center justify-center'
					>
						<Icon size={24} icon='plus' color='white' />
					</button>
				))}
			{rivals.map((rival, rivalIndex) => (
				<div
					className='flex flex-col items-center gap-base-x1 relative'
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
							src={avatar}
							alt=''
							className='w-base-x7 h-base-x7 rounded-base-x1'
						/>
					</div>
					{rival?.countCards && (
						<Typography
							variant='text'
							className='absolute flex items-center bg-white z-50 justify-center left-[50%] -translate-x-[50%] -bottom-[40px] w-base-x6 h-base-x6 rounded-full text-blue font-bold border-2 border-blue'
						>
							{rival.countCards}
						</Typography>
					)}
					<div
						id={'Cards' + rivalIndex}
						className='w-full absolute top-[60px] left-[10px] z-20'
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
													(90 / rival.countCards) * index -
													maxRivalCardsAngleDegrees
												}deg`,
												transformOrigin: 'center 10px',
												zIndex: 20 + index
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
