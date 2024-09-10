import cn from 'clsx'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '@/shared/assets/tapps.png'
import { useFriends } from '../lib/useFriends'
import { getId } from '@/entities/auth'
import Layout from '@/app/layout/Layout'
import Button from '@/shared/ui/button/ui/Button'
import Loader from '@/shared/ui/loader/Loader'
import { Typography } from '@/shared/ui/typography'

export function FriendsPage(): ReactElement {
	const { friends, isFriendsLoading } = useFriends()
	const [isCopy, setIsCopy] = useState(false)
	const tgId = getId()
	const navigate = useNavigate()

	const copyLink = () => {
		window.open(
			`https://t.me/share/url?url=https://t.me/ton_fool_bot?start=invite_${tgId}`,
		)
		setIsCopy(true)
	}

	return (
		<Layout
			header={{ icon: 'friends', title: 'Друзья' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button
						onClick={copyLink}
						icon={isCopy ? 'checkbox' : 'copy'}
					>
						Пригласить
					</Button>
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
						<div
							className='flex items-center gap-base-x5 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
							key={item.chat_id}
						>
							<img
								src={item.photo_url ? item.photo_url : avatar}
								alt=''
								className='w-base-x7 h-base-x7 rounded-base-x1'
							/>
							<div className='flex flex-col'>
								<div className='flex gap-base-x1 items-center'>
									<Typography variant='text'>
										{item.username}
									</Typography>
									<Typography
										variant='text'
										className={cn(
											item.is_online
												? 'text-green'
												: 'text-red',
										)}
									>
										{item.is_online ? 'online' : 'offline'}
									</Typography>
								</div>
								<Typography
									variant='text'
									className='text-left'
								>
									🏆 {item.cups}
								</Typography>
							</div>
						</div>
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

export default FriendsPage
