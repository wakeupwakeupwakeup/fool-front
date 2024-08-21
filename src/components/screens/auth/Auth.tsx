import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout } from '@/components/ui'

import { getFriendId } from '@/services/auth/auth.helper'

const Auth: FC = () => {
	const { search } = useLocation()
	const queryParams = new URLSearchParams(search)
	const { mutate } = useAuth()
	const friend_id = getFriendId()

	useEffect(() => {
		const data = {
			id: queryParams.get('id'),
			first_name: queryParams.get('first_name'),
			last_name: queryParams.get('last_name'),
			username: queryParams.get('username'),
			photo_url: queryParams.get('photo_url'),
			auth_date: queryParams.get('auth_date'),
			hash: queryParams.get('hash'),
			referal_id: friend_id || null
		}

		if (!!data?.id) mutate(data as any)

		const script = document.createElement('script')
		script.async = true
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.setAttribute('data-telegram-login', 'privates_manager_bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-auth-url', 'https://tonfool.online/auth')
		script.setAttribute('data-request-access', 'write')

		document.querySelector('.auth')?.appendChild(script)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'></Layout>
	)
}

export default Auth
