import { IPlayer } from '@/shared/types/auth.interface'

import { request } from '@/services/api/request.api'

export const FriendsService = {
	async getFriends(tg_id: number) {
		return request<IPlayer[]>({
			url: `/friends/${tg_id}`,
			method: 'GET'
		})
	},
	async addFriend(tg_id: number, friend_id: number) {
		return request<IPlayer[]>({
			url: `/friends/${tg_id}/${friend_id}`,
			method: 'POST'
		})
	}
}
