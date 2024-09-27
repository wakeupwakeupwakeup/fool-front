import {
	IGameRequest,
	IGameResponse,
	IGameResultsResponse,
} from '../model/types/game.model'
import { request } from '@/shared/api/request.api'

export const GameService = {
	createGame(info: IGameRequest) {
		return request<IGameResponse>({
			url: `/create`,
			method: 'POST',
			data: info,
		})
	},
	getGameResults(gameUuid: string) {
		return request<IGameResultsResponse>({
			url: `/game_result/${gameUuid}`,
			method: 'GET',
		})
	},
}
