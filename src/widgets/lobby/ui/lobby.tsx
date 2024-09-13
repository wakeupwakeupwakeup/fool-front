import { ReactElement } from 'react'
import Layout from '@/app/layout/Layout'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@/shared/ui/typography'
import { useSelector } from 'react-redux'
import { RootState } from '@/app'

export function Lobby(): ReactElement {
	const navigate = useNavigate()
	const gameInfo = useSelector((state: RootState) => state.game)
	return (
		<Layout
			className='flex flex-col justify-normal'
			header={{ icon: 'fan', title: 'Ожидание' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button onClick={() => {}}>Готов</Button>
					<Button
						onClick={() => navigate('/createGame')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
		>
			<div className='text-center'>
				<Typography variant='h1'>Параметры игры:</Typography>
				<Typography variant='text'>Ставка: {gameInfo.bet}</Typography>
				<Typography variant='text'>
					Тип игры: {gameInfo.type}
				</Typography>
				<Typography variant='text'>
					Количество игроков: {gameInfo.playersNumber}
				</Typography>
			</div>
			<div>
				<Typography variant='text'>Соперники</Typography>
				<div></div>
			</div>
		</Layout>
	)
}
