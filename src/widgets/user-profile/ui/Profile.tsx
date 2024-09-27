import { ReactNode } from 'react'
import avatar from '@/shared/assets/tapps.png'
import Loader from '@/shared/ui/loader/Loader'
import { Typography } from '@/shared/ui/typography'
import { useProfile } from '@/entities/user'
import { API_URL } from '@/shared/consts/url'
import Icon from '@/shared/ui/icon/Icon'

export function Profile(): ReactNode {
	const { user, isUserLoading } = useProfile()
	if (isUserLoading)
		return (
			<div className='h-[64px]'>
				<Loader />
			</div>
		)

	return (
		user && (
			<div className='flex items-center gap-base-x3'>
				<img
					src={
						user.photo_path
							? API_URL + 'files/' + user.photo_path
							: avatar
					}
					alt=''
					className='h-base-x7 w-base-x7 rounded-base-x1 border border-white'
				/>
				<div className='flex w-full flex-col justify-between'>
					<div className='flex flex-col justify-between'>
						<Typography className='text-lg' variant='text'>
							{user.username}
						</Typography>
						<div className='flex items-center gap-base-x1'>
							<Typography className='text-base' variant='text'>
								🏆{user.rating}
							</Typography>
						</div>
					</div>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-base-x1'>
							<Icon size={18} icon={'fool'} />
							<Typography className='text-base' variant='text'>
								{user.balance_fool}
							</Typography>
						</div>
						<div className='flex items-center gap-base-x1'>
							<Icon size={18} icon={'ton'} />
							<Typography className='text-base' variant='text'>
								{user.balance_ton}
							</Typography>
						</div>
						<div className='flex items-center gap-base-x1'>
							<Icon size={18} icon={'usdt'} />
							<Typography className='text-base' variant='text'>
								{user.balance_usdt}
							</Typography>
						</div>
						<div className='flex items-center gap-base-x1'>
							<Icon size={18} icon={'notcoin'} />
							<Typography className='text-base' variant='text'>
								{user.balance_notcoin}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		)
	)
}
