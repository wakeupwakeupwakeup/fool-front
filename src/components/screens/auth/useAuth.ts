import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { saveId } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const useAuth = id => {
	const navigate = useNavigate()

	const { mutate } = useMutation(['token'], data => AuthService.token(data), {
		onSuccess: async () => {
			await saveId(id)
			navigate(0)
		}
	})
	return {
		mutate
	}
}
