import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '@/hooks/useTelegram'

import { IPlayer } from '@/shared/types/auth.interface'

import { deleteId } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

import { playerAtom } from '@/store'

export const useProfile = () => {
	const { user } = useTelegram()
	const navigate = useNavigate()
	const [_, setPlayer] = useAtom(playerAtom)

	const { data, isLoading: isUserLoading } = useQuery(
		['getPlayer'],
		() => AuthService.getPlayer(user.id.toString()),
		{
			onSuccess: async (data: IPlayer) => {
				if (!data) {
					await deleteId()
					navigate(0)
				} else {
					// @ts-ignore
					setPlayer(data)
				}
			}
		}
	)

	return useMemo(
		() => ({
			user: data,
			isUserLoading
		}),
		[isUserLoading]
	)
}
