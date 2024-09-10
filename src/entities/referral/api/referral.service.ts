import { IUser } from '@/entities/user/model/types'
import { request } from '@/shared/api'

export const ReferralService = {
	async getReferrals() {
		return request<IUser[]>({
			url: '/referrals',
			method: 'GET',
		})
	},
	async addFriend(tg_id: string, friend_id: string) {
		return request<IUser[]>({
			url: `/friends/${tg_id}/${friend_id}`,
			method: 'POST',
		})
	},
}
