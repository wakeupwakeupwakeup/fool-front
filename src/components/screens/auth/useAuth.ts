import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { AuthService } from '@/services/auth/auth.service'

import { useTelegram } from '@/hooks'
import { useAuth as useAuthProvider } from '@/providers/AuthContext'

export const useAuth = () => {
	const navigate = useNavigate()
	const { user } = useTelegram()
	const { setId } = useAuthProvider()

	const { mutate } = useMutation(['token'], data => AuthService.token(data), {
		onSuccess: async () => {
			await setId(user.id.toString())
			navigate('/menu')
		}
	})
	return {
		mutate
	}
}
