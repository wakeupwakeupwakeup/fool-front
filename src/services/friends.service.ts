import { IPlayer } from '@/shared/types/auth.interface'
import { TCurrency } from '@/shared/types/game.interface'

import { request } from '@/services/api/request.api'

export const FriendsService = {
	async getFriends(tg_id: string) {
		return request<IPlayer[]>({
			url: `/friends/${tg_id}`,
			method: 'GET'
		})
	},
	async getFriendsOnline(tg_id: string, bet: number, currency: TCurrency) {
		return request<IPlayer[]>({
			url: `/friends/online/${tg_id}?balance=${bet}&currency=${currency}`,
			method: 'GET'
		})
	}
}
