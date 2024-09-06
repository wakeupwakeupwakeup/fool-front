import { IPlayer } from '@/entities/auth/model/auth.interface'

import { request } from '@/shared/api/axios/request.api'

export const FriendsService = {
	async getFriends(tg_id: string) {
		return request<IPlayer[]>({
			url: `/friends/${tg_id}`,
			method: 'GET',
		})
	},
	async addFriend(tg_id: string, friend_id: string) {
		return request<IPlayer[]>({
			url: `/friends/${tg_id}/${friend_id}`,
			method: 'POST',
		})
	},
}
