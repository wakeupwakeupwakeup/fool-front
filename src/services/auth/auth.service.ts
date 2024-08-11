import { IPlayer } from '@/shared/types/auth.interface'

import { request } from '@/services/api/request.api'

export const AuthService = {
	async token(data) {
		return request<IPlayer>({
			url: '/token',
			method: 'POST',
			body: data
		})
	}
}
