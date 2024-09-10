import { useMemo } from 'react'
import { useAuth } from '@/entities/auth/lib/hooks/useAuth'

export function useProfile() {
	const { isLoading, user } = useAuth()

	return useMemo(() => {
		return {
			user: user,
			isUserLoading: isLoading,
		}
	}, [isLoading, user])
}
