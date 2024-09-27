import { useNavigate } from 'react-router-dom'
import { useProfile } from '@/entities/user'
import Button from '@/shared/ui/button/ui/Button'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'
import Layout from '@/shared/ui/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'

const currencyMap = {
	balance_fool: 'FOOL',
	balance_usdt: 'USDT',
	balance_ton: 'TON',
	balance_notcoin: 'NOT',
}

export function BalancePage() {
	const navigate = useNavigate()
	const { user, isUserLoading } = useProfile()

	return isUserLoading ? (
		<Loader />
	) : (
		user && (
			<Layout
				header={{ icon: 'balance', title: 'Баланс' }}
				footer={
					<div className='flex w-full gap-base-x2'>
						<Button>Копировать адрес</Button>
						<Button
							onClick={() => navigate('/home')}
							icon='back'
							style={{ width: 63 }}
						/>
					</div>
				}
				className='flex flex-col items-center gap-[50px]'
			>
				<div className='flex w-full flex-col items-center justify-center gap-base-x5'>
					{Object.entries(user)
						.filter(([key]) => key.startsWith('balance'))
						.map(([key, value], index) => (
							<div
								key={index}
								className='grid w-full grid-cols-[1fr_0.5fr_1fr] grid-rows-1 items-center gap-base-x2 rounded border border-dashed border-white py-2'
							>
								<Typography
									variant='text'
									className='my-auto place-self-end'
								>
									{currencyMap[key]}
								</Typography>
								<Icon
									icon={key.split('_')[1]}
									size={50}
									className='place-self-center'
								/>
								{!['tether', 'notcoin'].includes(key) ? (
									<Typography
										variant='text'
										className='place-self-auto'
									>
										{value}
									</Typography>
								) : (
									<Typography
										variant='text'
										className='place-self-auto font-bold text-yellow'
									>
										SOON
									</Typography>
								)}
							</div>
						))}
				</div>
				<div className='flex max-w-[290px] flex-col items-center gap-base-x5 text-center'>
					<Typography variant='text'>
						Для пополнения баланса используйте только сеть ТОН!
					</Typography>
					<Typography variant='text'>
						Вывод средств осуществляется через меню бота.
					</Typography>
				</div>
			</Layout>
		)
	)
}
