import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Icon, Layout, Typography } from '@/components/ui'

import avatar from '@/assets/tapps.png'

const ResultGame: FC = () => {
	const navigate = useNavigate()
	const rivals = [
		{ name: 'tg_username-1', place: 1, selected: true },
		{ name: 'tg_username-2', place: 2, selected: true },
		{ name: 'tg_username-3', place: 3, selected: false },
		{ name: 'tg_username-4', place: 4, selected: false }
	]

	const icons = [
		{ place: 1, icon: 'one-place' },
		{ place: 2, icon: 'two-place' },
		{ place: 3, icon: 'three-place' }
	]

	return (
		<Layout
			footer={<Button onClick={() => navigate('/menu')}>Главное меню</Button>}
			className='flex flex-col gap-base-x6 justify-center items-center'
		>
			<Typography variant='h1'>Игра окончена</Typography>
			<div className='flex flex-col w-full gap-base-x6'>
				{rivals.map(item => (
					<button
						className='flex justify-between items-center gap-base-x3 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
						key={item.name}
					>
						<div className='flex items-center gap-base-x5'>
							<img
								src={avatar}
								alt=''
								className='w-base-x7 h-base-x7 rounded-base-x1'
							/>
							<div className='flex flex-col justify-between'>
								<Typography variant='text'>{item.name}</Typography>
								<Typography variant='text'>+ 4.45 $ТОН</Typography>
							</div>
						</div>
						{item.selected && (
							<Icon size={25} icon={icons[item.place].icon || 'loser'} />
						)}
					</button>
				))}
			</div>
			<Button onClick={() => navigate('/create-game')}>Играть еще раз</Button>
		</Layout>
	)
}

export default ResultGame
