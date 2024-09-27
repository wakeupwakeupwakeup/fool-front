import { IUser } from '@/entities/auth'
import { request } from '@/shared/api/request.api'

export const AuthService = {
	async login(data) {
		return request<IUser>({
			url: '/login',
			method: 'GET',
			params: data.referralId
				? { ref_id: data.referralId.split('_')[1] }
				: null,
			headers: {
				'Content-Type': 'application/json',
				Authorization: data.value,
			},
		})
	},
}
