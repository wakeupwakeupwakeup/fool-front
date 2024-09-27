import { useMutation } from '@tanstack/react-query'
import { IGameRequest } from '@/entities/game/model/types/game.model'
import { GameService } from '@/entities/game/api/game.service'
import { useNavigate } from 'react-router-dom'

export const useCreateGame = () => {
	const navigate = useNavigate()
	const { mutate: createGame } = useMutation({
		mutationKey: ['createGame'],
		mutationFn: (info: IGameRequest) => GameService.createGame(info),
		onSuccess: data => {
			if (data) {
				console.log('DEV | GAME UUID FROM SERVER: ', data.game_uuid)
				localStorage.setItem('game_uuid', data.game_uuid)
				navigate('/lobby')
			}
		},
	})

	return { createGame }
}
