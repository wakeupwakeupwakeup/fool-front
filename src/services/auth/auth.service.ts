import { IPlayer } from '@/shared/types/auth.interface'

import { request } from '@/services/api/request.api'

export const AuthService = {
	async getPlayer(tg_id: string) {
		return request<IPlayer>({
			url: `/player/${tg_id}`,
			method: 'GET'
		})
	},
	async token(data) {
		return request<IPlayer>({
			url: '/token',
			method: 'POST',
			data
		})
	}
}
