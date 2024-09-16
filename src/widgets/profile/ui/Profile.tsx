import { ReactNode } from 'react'
import avatar from '@/shared/assets/tapps.png'
import Loader from '@/shared/ui/loader/Loader'
import { Typography } from '@/shared/ui/typography'
import { useProfile } from '@/entities/user'
import { API_URL } from '@/shared/api/api.config'

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
			<div className='flex gap-base-x3'>
				<img
					src={
						user.photo_path
							? API_URL + 'files/' + user.photo_path
							: avatar
					}
					alt=''
					className='h-base-x7 w-base-x7 rounded-base-x1'
				/>
				<div className='flex w-full flex-col justify-between'>
					<div className='flex justify-between'>
						<Typography className='text-xl' variant='text'>
							{user.username}
						</Typography>
						<div className='flex items-center gap-base-x1'>
							<Typography variant='text'>🏆</Typography>
							<Typography variant='text'>{user.cups}</Typography>
						</div>
					</div>
					{/*<div className='flex items-center justify-between'>*/}
					{/*	{user.balance &&*/}
					{/*		Object.entries(user.balance).map(item => (*/}
					{/*			<div*/}
					{/*				key={item[0]}*/}
					{/*				className='flex gap-base-x1 items-center'*/}
					{/*			>*/}
					{/*				<Icon size={18} icon={item[0]} />*/}
					{/*				<Typography variant='text'>*/}
					{/*					{item[1]}*/}
					{/*				</Typography>*/}
					{/*			</div>*/}
					{/*		))}*/}
					{/*</div>*/}
				</div>
			</div>
		)
	)
}

export default Profile
