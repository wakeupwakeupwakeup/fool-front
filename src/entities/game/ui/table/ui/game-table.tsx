import { useSelector } from 'react-redux'
import { Card } from '@/entities/game/ui/card/ui/card'
import { useEffect } from 'react'
import { CardPlace } from '@/entities/game/ui/table/ui/card-place'
import { RootState } from '@/app/store'

export function GameTable() {
	const { game_board } = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)

	useEffect(() => {
		console.log(game_board)
	}, [game_board])

	return (
		<div className='z-20 mt-10 flex h-1/2 w-full flex-wrap justify-center'>
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
			{game_board.length < 6 && <CardPlace />}
		</div>
	)
}
