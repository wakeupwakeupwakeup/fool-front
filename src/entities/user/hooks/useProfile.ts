import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { playerAtom } from '@/entities/user'
import { AuthService, deleteId } from '@/entities/auth'
import { useInitData } from '@telegram-apps/sdk-react'

interface IProfile {
	user: WebAppUser
	isUserLoading: boolean
}

export function useProfile(): IProfile {
	const initData = useInitData()
	const navigate = useNavigate()
	const [, setPlayer] = useAtom(playerAtom)

	const { data, isLoading: isUserLoading } = useQuery(
		['getPlayer'],
		async () => {
			if (initData && initData.user) {
				await AuthService.getPlayer(initData.user.id.toString())
			}
		},
	)

	useEffect(() => {
		if (!data) {
			deleteId()
			navigate(0)
		} else {
			setPlayer(data)
		}
	}, [data, navigate, setPlayer])

	if (data)
		return {
			user: data,
			isUserLoading,
		}
}
