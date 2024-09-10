import { ReactElement, useEffect } from 'react'
import { useAuth } from '@/entities/auth/lib/hooks/useAuth'
import Layout from '@/app/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'
import { useNavigate } from 'react-router-dom'

export function AuthPage(): ReactElement {
	const navigate = useNavigate()
	const { isSuccess } = useAuth()

	useEffect(() => {
		navigate('/home')
	}, [isSuccess])

	return (
		<Layout className='flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default AuthPage
