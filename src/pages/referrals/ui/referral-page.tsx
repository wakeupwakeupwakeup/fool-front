import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '@/shared/assets/tapps.png'
import { useReferrals } from '../lib/useReferrals'
import { getId } from '@/entities/auth'
import Layout from '@/app/layout/Layout'
import Button from '@/shared/ui/button/ui/Button'
import Loader from '@/shared/ui/loader/Loader'
import { Typography } from '@/shared/ui/typography'
import { useUtils } from '@telegram-apps/sdk-react'

export function ReferralPage(): ReactElement {
	const { friends, isFriendsLoading } = useReferrals()
	const tgId = getId()
	const navigate = useNavigate()
	const tgUtils = useUtils()

	return (
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

export default ReferralPage
