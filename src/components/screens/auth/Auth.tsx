import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@/components/screens/auth/useAuth'
import { Layout } from '@/components/ui'

const Auth: FC = () => {
	const location = useLocation()
	const [tgId, setTgId] = useState(null)
	const { mutate } = useAuth(tgId)

	// https://tonfool.online/menu?id=805868998&first_name=Danil&username=danil_mor&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FktWdVGZAA3C0h0uyVs4rKxUdJ-0g4Bz0eSSk1DLEElw.jpg&auth_date=1723388640&hash=c783e9787583d6d5874ceb5d5c2de8656cec2523ea4d67cf77f741776ba42d14

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search)

		const id = queryParams.get('id')
		if (id) setTgId(id)
		const firstName = queryParams.get('first_name')
		const username = queryParams.get('username')
		const photoUrl = queryParams.get('photo_url')
		const authDate = queryParams.get('auth_date')
		const hash = queryParams.get('hash')

		const data = {
			id,
			firstName,
			username,
			photoUrl,
			authDate,
			hash
		}

		if (JSON.stringify(data)) {
			console.log('data верная')
			mutate()
		}

		console.log(data)

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
