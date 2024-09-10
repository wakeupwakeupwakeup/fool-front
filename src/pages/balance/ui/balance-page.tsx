import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '@/entities/user'
import Layout from '@/app/layout/Layout'
import Button from '@/shared/ui/button/ui/Button'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'

export function BalancePage(): ReactElement {
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
				{user?.balance &&
					Object.entries(user.balance).map((item, index) => (
						<div
							key={index}
							className='grid grid-rows-1 grid-cols-[1fr_0.5fr_1fr] w-full items-center gap-base-x2'
						>
							<Typography
								variant='text'
								className='place-self-end my-auto'
							>
								{item[0]}
							</Typography>
							<Icon
								icon={item[0]}
								size={50}
								className='place-self-center'
							/>
							{!['tether', 'notcoin'].includes(item[0]) ? (
								<Typography
									variant='text'
									className='place-self-auto'
								>
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
