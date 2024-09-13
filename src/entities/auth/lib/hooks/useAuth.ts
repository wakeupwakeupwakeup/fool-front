import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '@/app'
import { useContext, useEffect } from 'react'
import { AuthService } from '@/entities/auth'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

export function useAuth() {
	const authContext = useContext(AuthContext)
	if (!authContext) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}
	const { initDataRaw, startParam } = retrieveLaunchParams()
	const payload = {
		value: initDataRaw,
		referralId: startParam || null,
	}
	const { setId } = authContext
	const {
		isLoading,
		isSuccess,
		data: user,
	} = useQuery(['login'], () => AuthService.login(payload))

	useEffect(() => {
		if (isSuccess) {
			setId(user.chat_id.toString())
		}
	}, [isSuccess, setId, user])

	return { isSuccess, isLoading, user }
}
