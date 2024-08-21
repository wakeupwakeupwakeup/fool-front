import { IGame, IGameRequest } from '@/shared/types/game.interface'

import { request } from '@/services/api/request.api'

export const GameService = {
	async createGame({ info, tg_id }: { info: IGameRequest; tg_id: string }) {
		return request<IGame>({
			url: `/create-game/${tg_id}`,
			method: 'POST',
			data: { ...info }
		})
	}
}
