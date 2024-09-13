import { Button } from '@/shared/ui/button'
import { Bet, Currency, Rivals, Type } from './ui'
import {
	IGameRequest,
	setGameInfo,
	setWaiting,
	TCurrency,
	TTypeGame,
} from '@/entities/game'
import Layout from '@/app/layout/Layout'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from '@/entities/user'

export function GameCreation({ user }: { user: IUser }) {
	const [info, setInfo] = useState<IGameRequest>({
		currency: 'Fool',
		bet: 1,
		player_count: 1,
		type: 'flip_up',
	})

	const dispatch = useDispatch()
	const navigate = useNavigate()

	// const { createGame } = useCreateGame()

	const onSubmit = () => {
		console.log(info)
		const gameInfo = info
		gameInfo.playersNumber = info.player_count
		dispatch(setGameInfo(gameInfo))
		dispatch(setWaiting())
		// createGame(info)
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

	return (
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
					updateInfo('player_count', value + 1)
				}
			/>
		</Layout>
	)
}
