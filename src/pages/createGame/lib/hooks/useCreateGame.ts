import { useMutation } from '@tanstack/react-query'
import { IGameRequest } from '@/entities/game/model/game.interface'
import { GameService } from '@/entities/game/api/game.service'
import { useNavigate } from 'react-router-dom'

export const useCreateGame = () => {
	const navigate = useNavigate()
	const { mutate: createGame } = useMutation(
		['createGame'],
		(info: IGameRequest) => GameService.createGame(info),
		{
			onSuccess: data => {
				if (data) {
					localStorage.setItem('game_uuid', data.game_uuid)
					navigate('/lobby')
				}
			},
		},
	)

	return { createGame }
}
