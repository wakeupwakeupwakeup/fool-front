import { ReactElement } from 'react'
import avatar from '@/shared/assets/tapps.png'
import Loader from '@/shared/ui/loader/Loader'
import Icon from '@/shared/ui/icon/Icon'
import { IPlayer } from '@/entities/auth'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	user: IPlayer
	isLoading: boolean
}

export function Profile({ user, isLoading }: IProps): ReactElement {
	if (isLoading)
		return (
			<div className='h-[64px]'>
				<Loader />
			</div>
		)

	return (
		<div className='flex gap-base-x3'>
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
							<div
								key={item[0]}
								className='flex gap-base-x1 items-center'
							>
								<Icon size={18} icon={item[0]} />
								<Typography variant='text'>
									{item[1]}
								</Typography>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Profile
