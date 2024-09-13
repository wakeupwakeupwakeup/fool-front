import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { IGameRequest } from '@/entities/game/model/game.interface'

import {
	deleteGame,
	deletePlace,
	saveGame,
} from '@/entities/game/lib/game.helper'
import { GameService } from '@/entities/game/api/game.service'
import { useDispatch } from 'react-redux'
import { setGameInfo } from '@/entities/game/model/game.slice'

export const useCreateGame = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { mutate: createGame, isLoading: isCreateGameLoading } = useMutation(
		['createGame'],
		(info: IGameRequest) => GameService.createGame(info),
		{
			onSuccess: data => {
				dispatch(setGameInfo(data))
				deleteGame()
				deletePlace()
				saveGame(data)
				navigate('/lobby')
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
