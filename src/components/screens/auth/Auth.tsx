import { FC, useState } from 'react'

import { Button, Layout } from '@/components/ui'

import { saveId } from '@/services/auth/auth.helper'

import { useAuth } from './useAuth'

const Auth: FC = () => {
	const [id, setId] = useState('')
	const [newId, setNewId] = useState('')
	const { player } = useAuth(newId)
	console.log(player)
	const onSubmit = async () => {
		await saveId(id)
		setNewId(id)
	}

	/*useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.setAttribute('data-telegram-login', 'samplebot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-request-access', 'write')
		script.setAttribute('data-onauth', 'onTelegramAuth(user)')

		document.querySelector('.auth')?.appendChild(script)
	}, [])

	;(window as any).onTelegramAuth = onTelegramAuth
	*/

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			<input
				type='text'
				onChange={e => setId(e.target.value)}
				className='w-full h-base-x6 border border-white rounded-base-x1 outline-0 py-base-x5 px-base-x2'
				style={{
					background: 'none'
				}}
				placeholder='TD ID'
			/>
			<Button className='border border-white' onClick={onSubmit}>
				Войти
			</Button>
		</Layout>
	)
}

export default Auth
