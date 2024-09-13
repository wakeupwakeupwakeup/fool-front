import { ReactElement, useEffect } from 'react'
import { useAuth } from '@/entities/auth/lib/hooks/useAuth'
import Layout from '@/app/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'
import { useNavigate } from 'react-router-dom'

export function AuthPage(): ReactElement {
	const navigate = useNavigate()
	const { isSuccess, user } = useAuth()

	useEffect(() => {
		console.log('DEV | SUCCESS LOGIN')
		if (isSuccess && user) navigate('/home')
	}, [isSuccess, navigate, user])

	return (
		<Layout className='flex flex-col items-center justify-center gap-base-x3'>
			<Loader />
		</Layout>
	)
}

export default AuthPage
