import { FC, useEffect } from 'react'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout, Loader } from '@/components/ui'

import { getFriendId } from '@/services/auth/auth.helper'

import { useTelegram } from '@/hooks'

const Auth: FC = () => {
	const { mutate } = useAuth()
	const { tg } = useTelegram()
	const queryParams = new URLSearchParams(decodeURIComponent(tg.initData))
	const friend_id = getFriendId()

	useEffect(() => {
		const data = {
			user: JSON.parse(queryParams.get('user')),
			referal_id: friend_id || null,
			chat_instance: queryParams.get('chat_instance'),
			chat_type: queryParams.get('chat_type'),
			auth_date: queryParams.get('auth_date'),
			hash: queryParams.get('hash')
		}

		if (!!data?.hash) mutate(data as any)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default Auth
