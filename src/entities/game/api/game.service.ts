import { IGame, IGameRequest } from '@/entities/game/model/game.interface'

import { request } from '@/shared/api/axios/request.api'

export const GameService = {
	async createGame({ info, tg_id }: { info: IGameRequest; tg_id: string }) {
		return request<IGame>({
			url: `/create-game/${tg_id}`,
			method: 'POST',
			data: { ...info },
		})
	},
}
