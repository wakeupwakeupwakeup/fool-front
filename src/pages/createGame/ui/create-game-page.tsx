import { ReactNode, useEffect, useState } from 'react'
import { useProfile } from '@/entities/user'
import Loader from '@/shared/ui/loader/Loader'
import { Layout } from '@/app'
import { Button } from '@/shared/ui/button'
import { IGameRequest, TCurrency, TTypeGame } from '@/entities/game'
import { useNavigate } from 'react-router-dom'
import { useCreateGame } from '@/pages/createGame/lib/hooks/useCreateGame'
import { Currency } from '@/pages/createGame/ui/ui/Currency'
import { Bet } from '@/pages/createGame/ui/ui/Bet'
import { Type } from '@/pages/createGame/ui/ui/Type'
import { Rivals } from '@/pages/createGame/ui/ui/Rivals'

export function CreateGamePage(): ReactNode {
	const [info, setInfo] = useState<IGameRequest>({
		currency: 'Fool',
		bet: 1,
		player_count: 2,
		type: 'Throw-in',
	})

	const { user, isUserLoading } = useProfile()

	const navigate = useNavigate()

	const { createGame } = useCreateGame()

	const onSubmit = () => {
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

	useEffect(() => {
		console.log('DEV | CURRENT PLAYER: ', user)
	}, [])

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
							onClick={() => navigate('/home')}
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
					currentBalance={
						user[`balance_${info.currency.toLowerCase()}`]
					}
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
