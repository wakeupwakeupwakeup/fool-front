import { useSelector } from 'react-redux'
import { RootState } from '@/app'
import { Card } from '@/widgets/game/card/ui/card'

import cn from 'clsx'
import { CardPlace } from '@/widgets/game/table/ui/card-place'
import { useEffect } from 'react'

export function GameTable() {
	const { game_board } = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)

	useEffect(() => {
		console.log(game_board)
	}, [game_board])

	return (
		<div
			className={cn(
				{
					'grid-cols-2': game_board.length === 1,
					'grid-cols-3': game_board.length >= 2,
					'grid-rows-1': game_board.length < 5,
					'grid-rows-2': game_board.length >= 3,
				},
				'absolute z-10 grid h-1/3 w-full translate-y-48 place-items-center pl-8 pr-4',
			)}
		>
			{game_board.length === 0 && <CardPlace />}
			{game_board.map((card, index) => (
				<CardPlace
					attackingCard={
						<Card
							index={index}
							position='table'
							size='s'
							suit={Object.keys(card)[0]}
						/>
					}
					defendingCard={
						<Card
							index={index}
							position='table'
							size='s'
							suit={Object.values(card)[0]}
						/>
					}
					key={index}
				/>
			))}
			{game_board.length > 0 && <CardPlace />}
		</div>
	)
}
