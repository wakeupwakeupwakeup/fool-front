// import { useAtom } from 'jotai'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
// import { deleteId } from '@/entities/auth/lib/auth.helper'
import { menu } from '../model/menu.data'
import { useProfile } from '@/entities/user'
import Layout from '@/app/layout/Layout'
import Button from '@/shared/ui/button/ui/Button'
import Profile from '@/widgets/profile/ui/Profile'

export function HomePage(): ReactElement {
	const navigate = useNavigate()
	// const { user, isUserLoading } = useProfile()

	// const [ setPlayer] = useAtom(playerAtom)

	// const logout = async () => {
	// 	await deleteId()
	// 	setPlayer(null)
	// 	navigate(0)
	// }

	return (
		<Layout className='flex flex-col gap-base-x6 '>
			{/*<Profile user={user} isLoading={isUserLoading} />*/}
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
			</div>
		</Layout>
	)
}

export default HomePage
