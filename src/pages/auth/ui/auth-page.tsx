import { ReactElement, useEffect } from 'react'
import { getFriendId } from '@/entities/auth/lib/auth.helper'
import { useAuth } from '@/entities/auth/lib/hooks/useAuth'
import { useTelegram } from '@/shared/hooks/useTelegram'
import Layout from '@/app/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'

export function AuthPage(): ReactElement {
	const { mutate } = useAuth()
	const { tg } = useTelegram()
	const friend_id = getFriendId()

	useEffect(() => {
		const data = {
			value: tg.initData,
			referal_id: friend_id || null,
		}

		if (data?.value) mutate(data as any)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default AuthPage
