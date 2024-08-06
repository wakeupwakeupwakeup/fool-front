import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout, Loader, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

import { useFriends } from './useFriends'

const Friends: FC = () => {
	const { friends, isFriendsLoading } = useFriends()
	const navigate = useNavigate()

	return (
		<Layout
			header={{ icon: 'friends', title: 'Друзья' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button>Пригласить</Button>
					<Button
						onClick={() => navigate('/menu')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
		>
			<div className='flex flex-col gap-base-x6'>
				{isFriendsLoading ? (
					<Loader />
				) : friends && friends.length > 0 ? (
					friends.map(item => (
						<button
							className='flex items-center gap-base-x5 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
							key={item.tg_id}
						>
							<img
								src={item.photo_url ? item.photo_url : avatar}
								alt=''
								className='w-base-x7 h-base-x7 rounded-base-x1'
							/>
							<div className='flex flex-col'>
								<div className='flex gap-base-x1 items-center'>
									<Typography variant='text'>{item.username}</Typography>
									<Typography
										variant='text'
										className={cn(item.is_online ? 'text-green' : 'text-red')}
									>
										{item.is_online ? 'online' : 'offline'}
									</Typography>
								</div>
								<Typography variant='text' className='text-left'>
									🏆 {item.cups}
								</Typography>
							</div>
						</button>
					))
				) : (
					<Typography variant='text' className='text-center'>
						Нет друзей
					</Typography>
				)}
			</div>
		</Layout>
	)
}

export default Friends
