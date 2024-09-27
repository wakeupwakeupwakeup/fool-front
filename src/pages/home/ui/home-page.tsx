import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { menu } from '../model/menu.data'
import Button from '@/shared/ui/button/ui/Button'
import Layout from '@/shared/ui/layout/Layout'
import { Profile } from '@/widgets/user-profile'

export function HomePage(): ReactElement {
	const navigate = useNavigate()

	return (
		<Layout className='flex flex-col gap-base-x6'>
			<Profile />
			<div className='flex w-full flex-col gap-5'>
				{menu.map(item => (
					<Button
						onClick={() => navigate(item.path)}
						key={item.path}
						sizeIcon={30}
						icon={item.icon}
						variant='h1'
					>
						{item.soon && (
							<span className='absolute right-4 -rotate-[20deg] transform font-bold text-yellow'>
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
