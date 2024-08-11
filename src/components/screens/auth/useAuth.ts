import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { saveId } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const useAuth = () => {
	const navigate = useNavigate()

	const { mutate } = useMutation(['token'], data => AuthService.token(data), {
		onSuccess: async () => {
			const queryParams = new URLSearchParams(location.search)
			await saveId(queryParams.get('id'))
			navigate(0)
		}
	})
	return {
		mutate
	}
}
