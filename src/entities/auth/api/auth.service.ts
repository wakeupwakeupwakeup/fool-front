import { request } from '@/shared/api/axios'
import { IPlayer } from '@/entities/auth'

export const AuthService = {
	async getPlayer(tgId: string) {
		return request<IPlayer>({
			url: `/player/${tgId}`,
			method: 'GET',
		})
	},
	async token(data) {
		return request<IPlayer>({
			url: '/login',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: data.value,
			},
		})
	},
}
