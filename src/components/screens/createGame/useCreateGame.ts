import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { IGameRequest } from '@/shared/types/game.interface'

import { getId } from '@/services/auth/auth.helper'
import { saveGame } from '@/services/game/game.helper'
import { GameService } from '@/services/game/game.service'

export const useCreateGame = () => {
	const navigate = useNavigate()
	const tg_id = getId()

	const { mutate: createGame, isLoading: isCreateGameLoading } = useMutation(
		['createGame'],
		(info: IGameRequest) =>
			GameService.createGame({ info: info, tg_id: tg_id }),
		{
			onSuccess: data => {
				saveGame(data)
				navigate('/game')
			}
		}
	)

	return useMemo(
		() => ({
			createGame,
			isCreateGameLoading
		}),
		[isCreateGameLoading]
	)
}
