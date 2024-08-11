import { FC } from 'react'

import { Icon, Loader, Typography } from '@/components/ui'

import { IPlayer } from '@/shared/types/auth.interface'

import avatar from '@/assets/tapps.png'

interface IProps {
	user: IPlayer
	isLoading: boolean
}

const Profile: FC<IProps> = ({ user, isLoading }) => {
	if (isLoading) return <Loader />

	return (
		<div className='flex gap-base-x3'>
			{/*<div className='relative w-base-x7 h-base-x7 rounded-base-x1 overflow-hidden'>
				<img src={avatar} alt='' className='w-base-x7 h-base-x7 absolute' />
				<img
					src={user.photo_url ? user.photo_url : avatar}
					alt=''
					className='w-full relative'
				/>
			</div>*/}

			<img
				src={user.photo_url ? user.photo_url : avatar}
				alt=''
				className='w-base-x7 h-base-x7 rounded-base-x1'
			/>
			<div className='flex flex-col justify-between w-full'>
				<div className='flex justify-between'>
					<Typography variant='text'>{user.username}</Typography>
					<div className='flex gap-base-x1 items-center'>
						<Typography variant='text'>🏆</Typography>
						<Typography variant='text'>{user.cups}</Typography>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					{user.currency &&
						Object.entries(user.currency).map(item => (
							<div key={item[0]} className='flex gap-base-x1 items-center'>
								<Icon size={18} icon={item[0]} />
								<Typography variant='text'>{item[1]}</Typography>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Profile
