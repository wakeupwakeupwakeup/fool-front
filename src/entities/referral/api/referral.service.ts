import { IUser } from '@/entities/user/model/types'
import { request } from '@/shared/api/request.api'

export const ReferralService = {
	async getReferrals() {
		return request<IUser[]>({
			url: '/referrals',
			method: 'GET',
		})
	},
}
