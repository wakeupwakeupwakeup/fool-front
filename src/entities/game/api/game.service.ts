import { IGame, IGameRequest } from '@/entities/game/model/game.interface'

import { request } from '@/shared/api/axios/request.api'

export const GameService = {
	async createGame(info: IGameRequest) {
		return request<IGame>({
			url: `/create`,
			method: 'POST',
			data: info,
		})
	},
}
