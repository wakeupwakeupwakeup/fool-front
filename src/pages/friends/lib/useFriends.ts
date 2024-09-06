import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getId } from '@/entities/auth/lib/auth.helper'
import { FriendsService } from '@/entities/friend/api/friends.service'

export const useFriends = () => {
	const tg_id = getId()

	const { data: friends, isLoading: isFriendsLoading } = useQuery(
		['getFriends'],
		() => FriendsService.getFriends(tg_id),
	)

	return useMemo(
		() => ({
			friends,
			isFriendsLoading,
		}),
		[isFriendsLoading],
	)
}
