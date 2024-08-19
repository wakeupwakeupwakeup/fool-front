import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { getId } from '@/services/auth/auth.helper'
import { FriendsService } from '@/services/friends.service'

export const useFriends = () => {
	const tg_id = getId()
	const navigate = useNavigate()

	const { mutate: addFriend } = useMutation(
		['addFriend'],
		(friend_id: number) => FriendsService.addFriend(tg_id, friend_id),
		{
			onSuccess: () => {
				navigate('/friends')
			}
		}
	)

	const { data: friends, isLoading: isFriendsLoading } = useQuery(
		['getFriends'],
		() => FriendsService.getFriends(tg_id)
	)

	return useMemo(
		() => ({
			friends,
			addFriend,
			isFriendsLoading
		}),
		[isFriendsLoading]
	)
}
