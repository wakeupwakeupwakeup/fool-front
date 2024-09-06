import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { AuthService } from '@/entities/auth/api/auth.service'

import { useTelegram } from '@/shared/hooks/useTelegram'
import { useAuthContext } from '@/app'

export const useAuth = () => {
	const navigate = useNavigate()
	const { user } = useTelegram()
	const { setId } = useAuthContext()

	const { mutate } = useMutation(['token'], data => AuthService.token(data), {
		onSuccess: () => {
			setId(user.id.toString())
			navigate('/menu')
		},
	})
	return {
		mutate,
	}
}
