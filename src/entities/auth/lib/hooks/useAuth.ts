import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AuthService } from '@/entities/auth'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

export function useAuth() {
	const { initDataRaw, startParam } = retrieveLaunchParams()
	const payload = {
		value: initDataRaw,
		referralId: startParam ?? null,
	}
	const {
		isSuccess,
		isLoading,
		data: user,
	} = useQuery({
		queryKey: ['login'],
		queryFn: () => AuthService.login(payload),
	})

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('chat_id', user.chat_id)
		}
	}, [isSuccess, user])
	return { isSuccess, isLoading, user }
}
