import { useQuery } from '@tanstack/react-query'
import { GameService } from '@/entities/game/api/game.service'

export function useGetGameResults() {
	const gameUuid = localStorage.getItem('game_uuid')!
	const { data: results } = useQuery({
		queryKey: ['gameResults'],
		queryFn: () => GameService.getGameResults(gameUuid),
	})
	return { results }
}
