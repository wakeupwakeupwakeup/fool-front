import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getId } from '@/services/auth/auth.helper'
import { FriendsService } from '@/services/friends.service'

export const useFriends = () => {
	const tg_id = getId()

	const { data: friends, isLoading: isFriendsLoading } = useQuery(
		['getFriends'],
		() => FriendsService.getFriends(tg_id)
	)

	return useMemo(
		() => ({
			friends,
			isFriendsLoading
		}),
		[isFriendsLoading]
	)
}
