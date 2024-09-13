import { ReactNode } from 'react'
import { useProfile } from '@/entities/user'
import Loader from '@/shared/ui/loader/Loader'
import { useSelector } from 'react-redux'
import { Layout, RootState } from '@/app'
import { GameCreation } from '@/widgets/game-creation'
import { Lobby } from '@/widgets/lobby'

export function CreateGamePage(): ReactNode {
	const { user, isUserLoading } = useProfile()
	const isWaitingPlayers = useSelector(
		(state: RootState) => state.lobby.isWaitingPlayers,
	)

	if (isUserLoading) {
		return (
			<Layout
				header={{
					icon: 'fan',
					title: 'Новая игра',
				}}
			>
				<Loader />
			</Layout>
		)
	}

	return !isWaitingPlayers && user ? <GameCreation user={user} /> : <Lobby />
}
