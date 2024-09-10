import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	IGameRequest,
	TCurrency,
	TTypeGame,
} from '@/entities/game/model/game.interface'

import { Bet, Currency, Rivals, Type } from './components'
import { useCreateGame } from '../lib/useCreateGame'
import { useProfile } from '@/entities/user'
import Layout from '@/app/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'
import { Button } from '@/shared/ui/button'

export function CreateGamePage(): ReactNode {
	const navigate = useNavigate()
	const { user, isUserLoading } = useProfile()
	const [info, setInfo] = useState<IGameRequest>({
		currency: 'Fool',
		bet: 7,
		player_count: 1,
		type: 'flip_up',
	})
	const { createGame } = useCreateGame()
	const onSubmit = () => {
		console.log(info)
		createGame(info)
	}

	const updateInfo = <K extends keyof IGameRequest>(
		key: K,
		value: IGameRequest[K],
	) => {
		setInfo(prevInfo => ({
			...prevInfo,
			[key]: value,
		}))
	}

	if (isUserLoading) {
		return (
			<Layout
				header={{
					icon: 'fan',
					title: 'Новая игра',
				}}
			>
				<Loader />
			</Layout>
		)
	}

	return (
		user && (
			<Layout
				header={{
					icon: 'fan',
					title: 'Новая игра',
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
					selectedCurrency={info.currency}
				/>
				<Bet
					setSelectedBet={(value: number) => updateInfo('bet', value)}
					selectedBet={info.bet}
					currentBalance={user[`balance_${info.currency}`]}
					selectedCurrency={info.currency}
				/>
				<Type
					selectedType={info.type}
					setSelectedType={(value: TTypeGame) =>
						updateInfo('type', value)
					}
				/>
				<Rivals
					selectedCountRivals={info.player_count}
					setSelectedCountRivals={(value: number) =>
						updateInfo('player_count', value)
					}
				/>
			</Layout>
		)
	)
}

export default CreateGamePage
