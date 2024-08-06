import { IGame, IGameRequest } from '@/shared/types/game.interface'

import { request } from '@/services/api/request.api'

import { API_URL } from '@/config/api.config'

export const GameService = {
	async createGame({ info, tg_id }: { info: IGameRequest; tg_id: string }) {
		return request<IGame>({
			baseURL: API_URL,
			url: `/create-game/${tg_id}`,
			method: 'POST',
			data: { ...info }
		})
	},
	async deleteGame(id: string) {
		return request({
			baseURL: API_URL,
			url: `/game/${id}`,
			method: 'DELETE'
		})
	}
}
