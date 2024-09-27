import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import Layout from '@/shared/ui/layout/Layout'
import { useGetGameResults } from '@/entities/game/lib/hooks/use-get-game-results'
import Loader from '@/shared/ui/loader/Loader'
import { formatPhotoUrl } from '@/entities/user/lib/format-photo-url'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetNavigation } from '@/app/navigation/store/navigation.slice'

const iconsMap = {
	'-1': '🤡',
	0: '🤡',
	1: '🥇',
	2: '🥈',
	3: '🥉',
}

export function ResultPage() {
	const navigate = useNavigate()
	const { results } = useGetGameResults()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(resetNavigation())
	}, [dispatch])

	return results ? (
		<Layout
			footer={
				<Button onClick={() => navigate('/home')}>Главное меню</Button>
			}
			className='flex flex-col items-center justify-center gap-base-x6'
		>
			<Typography variant='h1'>Игра окончена</Typography>
			<div className='flex w-full flex-col gap-base-x6'>
				{results.players
					.sort((a, b) => {
						if (a.status === 0 && b.status !== 0) return 1
						if (b.status === 0 && a.status !== 0) return -1

						return b.status - a.status
					})
					.map(player => (
						<div
							className='flex w-full items-center justify-between gap-base-x3 rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)] pr-base-x2'
							key={player.username}
						>
							<div className='flex items-center gap-base-x5'>
								<img
									src={formatPhotoUrl(player.photo_path)}
									alt=''
									className='h-base-x7 w-base-x7 rounded-base-x1'
								/>
								<div className='flex flex-col justify-between'>
									<Typography variant='text'>
										{player.username}
									</Typography>

									<Typography
										variant='text'
										className='uppercase'
									>
										{player.status === 0
											? 'Looser'
											: player.status === -1
												? 'Disconnected'
												: `+ ${player.win_value} ${results.currency}`}
									</Typography>
								</div>
							</div>
							<span className='text-[30px]'>
								{iconsMap[player.status]}
							</span>
						</div>
					))}
			</div>
			<Button onClick={() => navigate('/create-game')}>
				Играть еще раз
			</Button>
		</Layout>
	) : (
		<Loader />
	)
}
