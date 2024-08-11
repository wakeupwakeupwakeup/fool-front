import { useAtom } from 'jotai'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout } from '@/components/ui'

import { deleteId } from '@/services/auth/auth.helper'

import { useProfile } from '@/hooks'
import { playerAtom } from '@/store'

import { Profile } from './components'
import { menu } from './menu.data'

const Menu: FC = () => {
	const navigate = useNavigate()
	const { user, isUserLoading } = useProfile()

	const [_, setPlayer] = useAtom(playerAtom)

	const logout = async () => {
		await deleteId()
		// @ts-ignore
		setPlayer(null)
		navigate(0)
	}

	return (
		<Layout className='flex flex-col gap-base-x6 '>
			<Profile user={user} isLoading={isUserLoading} />
			<div className='flex flex-col gap-5 w-full'>
				{menu.map(item => (
					<Button
						onClick={() => navigate(item.path)}
						key={item.path}
						sizeIcon={30}
						icon={item.icon}
						variant='h1'
					>
						{item.soon && (
							<span className='text-yellow font-bold absolute right-4 transform -rotate-[20deg]'>
								soon
							</span>
						)}
						{item.title}
					</Button>
				))}
				<Button onClick={logout} sizeIcon={30} variant='h1'>
					Выйти
				</Button>
			</div>
		</Layout>
	)
}

export default Menu
