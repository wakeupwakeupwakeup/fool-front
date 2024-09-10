import { ReactElement, useEffect } from 'react'
import { getFriendId, saveInitData } from '@/entities/auth/lib/auth.helper'
import { useAuth } from '@/entities/auth/lib/hooks/useAuth'
import Layout from '@/app/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

export function AuthPage(): ReactElement {
	const { mutate } = useAuth()
	const { initDataRaw } = retrieveLaunchParams()
	const friendId = getFriendId()

	useEffect(() => {
		const data = {
			value: initDataRaw,
			referralId: friendId || null,
		}

		if (data?.value && initDataRaw) {
			saveInitData(initDataRaw)
			mutate(data)
		}
	}, [])

	return (
		<Layout className='flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default AuthPage
