import { FC, useEffect } from 'react'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout, Loader } from '@/components/ui'

import { getFriendId } from '@/services/auth/auth.helper'

import { useTelegram } from '@/hooks'

const Auth: FC = () => {
	const { mutate } = useAuth()
	const { tg, user } = useTelegram()
	const queryParams = new URLSearchParams(tg.initData)
	const friend_id = getFriendId()

	useEffect(() => {
		console.log(queryParams)
		const data = {
			id: queryParams.get('id'),
			first_name: queryParams.get('first_name'),
			last_name: queryParams.get('last_name'),
			username: queryParams.get('username'),
			photo_url: user.photo_url,
			auth_date: queryParams.get('auth_date'),
			referal_id: friend_id || null,
			hash: queryParams.get('hash')
		}
		console.log(data)

		// if (!!data) mutate(data as any)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default Auth
