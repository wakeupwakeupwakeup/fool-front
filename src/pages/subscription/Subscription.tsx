import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Layout, Typography } from '@/components/ui'

const Subscription: FC = () => {
	const navigate = useNavigate()
	const channel = [
		{
			title: 'TON_Fool_chat',
			href: 'https://www.google.ru/'
		}
	]

	return (
		<Layout
			header={{ icon: 'tg', title: 'Подписки' }}
			footer={
				<Button onClick={() => navigate('/menu')} icon='back'>
					Назад
				</Button>
			}
			className='flex flex-col items-center gap-base-x6'
		>
			<Typography variant='text' className='text-center max-w-[315px]'>
				Подписки будут приносить вам дополнительно по одной монете за каждый
				канал или группу
			</Typography>
			<div className='flex flex-col gap-base-x6 w-full'>
				{channel.map(item => (
					<Link to={item.href}>
						<Button className='border border-dashed border-white'>
							{item.title}
						</Button>
					</Link>
				))}
			</div>
		</Layout>
	)
}

export default Subscription
