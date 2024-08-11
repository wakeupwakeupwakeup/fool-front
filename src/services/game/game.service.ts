import { IGame, IGameRequest } from '@/shared/types/game.interface'

import { request } from '@/services/api/request.api'

export const GameService = {
	async createGame({ info, tg_id }: { info: IGameRequest; tg_id: number }) {
		return request<IGame>({
			url: `/create-game/${tg_id}`,
			method: 'POST',
			data: { ...info }
		})
	},
	async deleteGame(id: string) {
		return request({
			url: `/game/${id}`,
			method: 'DELETE'
		})
	}
}
