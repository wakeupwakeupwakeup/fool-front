import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { deleteFriendId, getId } from '@/services/auth/auth.helper'
import { FriendsService } from '@/services/friends.service'

export const useAddFriend = () => {
	const tg_id = getId()
	const navigate = useNavigate()

	const { mutate: addFriend } = useMutation(
		['addFriend'],
		(friend_id: string) => FriendsService.addFriend(tg_id, friend_id),
		{
			onSuccess: async () => {
				await deleteFriendId()
				navigate('/friends')
			}
		}
	)

	return {
		addFriend
	}
}
