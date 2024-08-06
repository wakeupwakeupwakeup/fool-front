import { IPlayer } from '@/shared/types/auth.interface'

import { request } from '@/services/api/request.api'

import { API_URL } from '@/config/api.config'

export const AuthService = {
	async getPlayer(tg_id: string) {
		return request<IPlayer>({
			baseURL: API_URL,
			url: `/player/${tg_id}`,
			method: 'GET'
		})
	}
}
