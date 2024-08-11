import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout } from '@/components/ui'

const Auth: FC = () => {
	const location = useLocation()
	const [tgId, setTgId] = useState(null)
	const { mutate } = useAuth(tgId)

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search)

		const id = queryParams.get('id')
		if (id) setTgId(id)
		const first_name = queryParams.get('first_name')
		const last_name = queryParams.get('last_name')
		const username = queryParams.get('username')
		const photo_url = queryParams.get('photo_url')
		const auth_date = queryParams.get('auth_date')
		const hash = queryParams.get('hash')

		const data = {
			id,
			first_name,
			last_name,
			username,
			photo_url,
			auth_date,
			hash
		}

		if (JSON.stringify(data)) {
			mutate(data as any)
		}

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
