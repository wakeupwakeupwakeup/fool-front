import { FC, useEffect } from 'react'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout, Loader } from '@/components/ui'

import { getFriendId } from '@/services/auth/auth.helper'

import { useTelegram } from '@/hooks'

const Auth: FC = () => {
	const { mutate } = useAuth()
	const { tg } = useTelegram()
	const friend_id = getFriendId()

	useEffect(() => {
		const data = {
			value: tg.initData,
			referal_id: friend_id || null
		}

		if (!!data?.value) mutate(data as any)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default Auth
