import { FC, useEffect, useState } from 'react'

import { Layout } from '@/components/ui'

import { saveId } from '@/services/auth/auth.helper'

import { useAuth } from './useAuth'

const Auth: FC = () => {
	const [id, setId] = useState('')
	const [newId, setNewId] = useState('')
	const { player } = useAuth(newId)

	const onSubmit = async () => {
		await saveId(id)
		setNewId(id)
	}

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.setAttribute('data-telegram-login', 'privates_manager_bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-auth-url', 'https://tonfool.online/menu')
		script.setAttribute('data-request-access', 'write')

		document.querySelector('.auth')?.appendChild(script)
	}, [])

	return (
		<Layout className='auth flex flex-col gap-base-x3 items-center justify-center'>
			{/*<input
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
			</Button>*/}
		</Layout>
	)
}

export default Auth
