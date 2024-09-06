import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { IGameRequest } from '@/entities/game/model/game.interface'

import { getId } from '@/entities/auth/lib/auth.helper'
import {
	deleteGame,
	deletePlace,
	saveGame,
} from '@/entities/game/lib/game.helper'
import { GameService } from '@/entities/game/api/game.service'

export const useCreateGame = () => {
	const navigate = useNavigate()
	const tg_id = getId()

	const { mutate: createGame, isLoading: isCreateGameLoading } = useMutation(
		['createGame'],
		(info: IGameRequest) =>
			GameService.createGame({ info: info, tg_id: tg_id }),
		{
			onSuccess: data => {
				deleteGame()
				deletePlace()
				saveGame(data)
				navigate('/game')
			},
		},
	)

	return useMemo(
		() => ({
			createGame,
			isCreateGameLoading,
		}),
		[isCreateGameLoading],
	)
}
