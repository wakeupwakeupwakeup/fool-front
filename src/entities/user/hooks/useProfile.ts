import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '@/shared/hooks/useTelegram'

import { IPlayer } from '@/entities/auth/model/auth.interface'

import { deleteId } from '@/entities/auth/lib/auth.helper'
import { AuthService } from '@/entities/auth/api/auth.service'
import { playerAtom } from '@/entities/user'

export const useProfile = () => {
	const { user } = useTelegram()
	const navigate = useNavigate()
	const [setPlayer] = useAtom(playerAtom)

	const { data, isLoading: isUserLoading } = useQuery(
		['getPlayer'],
		() => AuthService.getPlayer(user.id.toString()),
		{
			onSuccess: async (data: IPlayer) => {
				if (!data) {
					await deleteId()
					navigate(0)
				} else {
					setPlayer(data)
				}
			},
		},
	)

	return useMemo(
		() => ({
			user: data,
			isUserLoading,
		}),
		[isUserLoading],
	)
}
