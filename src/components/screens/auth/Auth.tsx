import { FC, useEffect } from 'react'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout, Loader } from '@/components/ui'

import { getFriendId } from '@/services/auth/auth.helper'

import { useTelegram } from '@/hooks'

const Auth: FC = () => {
	const { mutate } = useAuth()
	const { tg, user } = useTelegram()
	const decodeURI = decodeURIComponent(tg.initData)
	const queryParams = new URLSearchParams(decodeURI)
	const friend_id = getFriendId()

	console.log(queryParams)
	useEffect(() => {
		const data = {
			user: JSON.parse(queryParams.get('user')),
			referal_id: friend_id || null,
			chat_instance: queryParams.get('chat_instance'),
			chat_type: queryParams.get('chat_type'),
			auth_date: queryParams.get('auth_date'),
			hash: queryParams.get('hash'),
			query_id: queryParams.get('query_id')
			/*user: JSON.parse(queryParams.get('user')),
			id: JSON.parse(queryParams.get('user')).id.toString(),
			first_name: JSON.parse(queryParams.get('user')).first_name || null,
			last_name: JSON.parse(queryParams.get('user'))?.last_name || null,
			username: JSON.parse(queryParams.get('user'))?.username || null,
			photo_url: JSON.parse(queryParams.get('user'))?.photo_url || null,
			referal_id: friend_id || null,
			auth_date: queryParams.get('auth_date'),
			hash: queryParams.get('hash')*/
		}

		console.log(data)

		if (!!data?.hash) mutate(data as any)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<Loader />
		</Layout>
	)
}

export default Auth
