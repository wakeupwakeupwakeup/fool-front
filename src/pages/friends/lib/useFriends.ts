import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FriendsService } from '@/entities/friend/api/friends.service'

export const useFriends = () => {
	const { data: friends, isLoading: isFriendsLoading } = useQuery(
		['getReferrals'],
		() => {
			return FriendsService.getReferrals()
		},
	)

	return useMemo(
		() => ({
			friends,
			isFriendsLoading,
		}),
		[isFriendsLoading],
	)
}
