import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout, Loader } from '@/components/ui'

import {
	IGameRequest,
	TCurrency,
	TTypeGame
} from '@/shared/types/game.interface'

import { useProfile } from '@/hooks'

import { Bet, Currency, Rivals, Type } from './components'
import { useCreateGame } from './useCreateGame'

const CreateGame: FC = () => {
	const navigate = useNavigate()
	const { user, isUserLoading } = useProfile()
	const [info, setInfo] = useState<IGameRequest>({
		currency: 'foolcoin',
		bet: 7,
		num_players: 1,
		type: 'flip_up'
	})
	const { createGame } = useCreateGame()
	const onSubmit = () => {
		const updatedInfo = { ...info, num_players: info.num_players + 1 }
		createGame(updatedInfo)
	}

	const updateInfo = <K extends keyof IGameRequest>(
		key: K,
		value: IGameRequest[K]
	) => {
		setInfo(prevInfo => ({
			...prevInfo,
			[key]: value
		}))
	}

	if (isUserLoading) {
		return (
			<Layout
				header={{
					icon: 'fan',
					title: 'Новая игра'
				}}
			>
				<Loader />
			</Layout>
		)
	}

	return (
		<Layout
			header={{
				icon: 'fan',
				title: 'Новая игра'
			}}
			footer={
				<div className='flex w-full gap-base-x2'>
					<Button onClick={onSubmit}>Играть</Button>
					<Button
						onClick={() => navigate('/menu')}
						icon='back'
						style={{ width: 63 }}
					/>
				</div>
			}
			className='flex flex-col gap-base-x2'
		>
			<Currency
				setSelectedCurrency={(value: TCurrency) =>
					updateInfo('currency', value)
				}
				currency={user?.currency}
				selectedCurrency={info.currency}
			/>
			<Bet
				setSelectedBet={(value: number) => updateInfo('bet', value)}
				selectedBet={info.bet}
				currentBalance={user?.currency[info.currency]}
				selectedCurrency={info.currency}
			/>
			<Type
				selectedType={info.type}
				setSelectedType={(value: TTypeGame) => updateInfo('type', value)}
			/>
			<Rivals
				selectedCountRivals={info.num_players}
				setSelectedCountRivals={(value: number) =>
					updateInfo('num_players', value)
				}
			/>
		</Layout>
	)
}

export default CreateGame
