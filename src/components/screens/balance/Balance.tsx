import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Icon, Layout, Typography } from '@/components/ui'

import { useProfile } from '@/hooks'

const Balance: FC = () => {
	const navigate = useNavigate()
	const { user } = useProfile()

	return (
		<Layout
			header={{ icon: 'balance', title: 'Баланс' }}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button>Копировать адрес</Button>
					<Button
						onClick={() => navigate('/menu')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
			className='flex flex-col items-center gap-[50px]'
		>
			<div className='flex flex-col items-center justify-center w-full gap-base-x5'>
				{user?.currency &&
					Object.entries(user.currency).map(item => (
						<div
							key={item[0]}
							className='grid grid-rows-1 grid-cols-[1fr_0.5fr_1fr] w-full items-center gap-base-x2'
						>
							<Typography variant='text' className='place-self-end my-auto'>
								{item[0]}
							</Typography>
							<Icon icon={item[0]} size={50} className='place-self-center' />
							{!['tether', 'notcoin'].includes(item[0]) ? (
								<Typography variant='text' className='place-self-auto'>
									{item[1]}
								</Typography>
							) : (
								<Typography
									variant='text'
									className='place-self-auto text-yellow font-bold'
								>
									SOON
								</Typography>
							)}
						</div>
					))}
			</div>
			<div className='flex flex-col items-center text-center max-w-[290px] gap-base-x5'>
				<Typography variant='text'>
					Для пополнения баланса используйте только сеть ТОН!
				</Typography>
				<Typography variant='text'>
					Вывод средств осуществляется через меню бота.
				</Typography>
			</div>
		</Layout>
	)
}

export default Balance
