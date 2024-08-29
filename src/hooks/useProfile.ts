import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useMemo } from 'react'

import { useTelegram } from '@/hooks/useTelegram'

import { IPlayer } from '@/shared/types/auth.interface'

import { AuthService } from '@/services/auth/auth.service'

import { playerAtom } from '@/store'

export const useProfile = () => {
	const { user } = useTelegram()
	const [_, setPlayer] = useAtom(playerAtom)

	const { data, isLoading: isUserLoading } = useQuery(
		['getPlayer'],
		() => AuthService.getPlayer(user.id.toString()),
		{
			onSuccess: (data: IPlayer) => {
				// @ts-ignore
				setPlayer(data)
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
