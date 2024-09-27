import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '@/shared/assets/tapps.png'
import { useReferrals } from '../lib/useReferrals'
import Button from '@/shared/ui/button/ui/Button'
import Loader from '@/shared/ui/loader/Loader'
import { Typography } from '@/shared/ui/typography'
import { useUtils } from '@telegram-apps/sdk-react'
import { formatPhotoUrl } from '@/entities/user/lib/format-photo-url'
import Layout from '@/shared/ui/layout/Layout'

export function ReferralPage(): ReactElement {
	const { friends, isFriendsLoading } = useReferrals()
	const tgId = localStorage.getItem('chat_id')
	const navigate = useNavigate()
	const tgUtils = useUtils()

	return isFriendsLoading ? (
		<Loader />
	) : (
		<Layout
			header={{ icon: 'friends', title: 'Друзья' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button
						onClick={() =>
							tgUtils.openTelegramLink(
								`https://t.me/share/url?url=https://t.me/tonfool_dev_bot/app?start=invite_${tgId}`,
							)
						}
						icon='copy'
					>
						Пригласить
					</Button>
					<Button
						onClick={() => navigate('/home')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
		>
			<div className='flex flex-col gap-base-x6'>
				{friends && friends.length > 0 ? (
					friends.map(item => (
						<div
							className='flex w-full items-center gap-base-x5 rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)] pr-base-x2'
							key={item.chat_id}
						>
							<img
								src={
									item.photo_path
										? formatPhotoUrl(item.photo_path)
										: avatar
								}
								alt=''
								className='h-base-x7 w-base-x7 rounded-base-x1'
							/>
							<div className='flex flex-col'>
								<div className='flex items-center gap-base-x1'>
									<Typography variant='text'>
										{item.username}
									</Typography>
								</div>
								<Typography
									variant='text'
									className='text-left'
								>
									🏆 {item.rating}
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

export default ReferralPage
