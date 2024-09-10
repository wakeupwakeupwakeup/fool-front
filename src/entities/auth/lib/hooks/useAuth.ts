import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/app'
import { AuthService } from '@/entities/auth/api/auth.service'
import { useContext } from 'react'

export const useAuth = () => {
	const navigate = useNavigate()
	const authContext = useContext(AuthContext)
	if (!authContext) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}
	const { setId } = authContext

	const { mutate } = useMutation(['token'], data => AuthService.token(data), {
		onSuccess: userData => {
			if (userData) {
				setId(userData.chat_id.toString())
				navigate('/menu')
			}
		},
	})
	return {
		mutate,
	}
}
