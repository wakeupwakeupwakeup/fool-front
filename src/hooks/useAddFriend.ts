import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { getId } from '@/services/auth/auth.helper'
import { FriendsService } from '@/services/friends.service'

export const useAddFriend = () => {
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

	return {
		addFriend
	}
}
