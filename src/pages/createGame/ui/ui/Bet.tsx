import cn from 'clsx'
import { ReactElement, useEffect, useState } from 'react'

import { TCurrency } from '@/entities/game/model/game.interface'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	selectedBet: number
	selectedCurrency: TCurrency
	currentBalance: number
	setSelectedBet: (value: number) => void
}

export function Bet({
	setSelectedBet,
	selectedBet,
	selectedCurrency,
	currentBalance,
}: IProps): ReactElement {
	const [error, setError] = useState(false)
	const [bet, setBet] = useState(selectedBet)
	const [multiplierRate, setMultiplierRate] = useState('')

	const bets = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const multiplierRates = ['x10', 'x50', 'x100', 'x300', 'x500', 'x1000']

	const changeBet = (value: number) => {
		setError(false)

		if (value > currentBalance) {
			return setError(true)
		}

		setBet(value)
		if (multiplierRate) {
			setSelectedBet(value * parseInt(multiplierRate.split('x')[1]))
		} else {
			setSelectedBet(value)
		}
	}

	useEffect(() => {
		if (bet > currentBalance) {
			return setError(true)
		} else {
			setError(false)
		}
	}, [selectedCurrency])

	const changeMultiplierRate = (value: string) => {
		setError(false)

		if (bet * value.split('x')[1] > currentBalance) {
			return setError(true)
		}

		setMultiplierRate(value)

		if (value) {
			setSelectedBet(bet * value.split('x')[1])
		}
	}

	const clearBet = () => {
		if (currentBalance >= bet) {
			setError(false)
		}
		setSelectedBet(1)
		setBet(1)
		setMultiplierRate('')
	}

	// TODO: Должны ли сбрасываться ставка при изменении валюты

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>Ставка</Typography>
			<div className='flex w-full flex-col gap-base-x2'>
				<div className='grid grid-cols-9 grid-rows-1 gap-base-x1'>
					{bets.map((item, index) => (
						<button
							onClick={() => changeBet(item)}
							className={cn(
								'flex h-base-x6 w-full items-center justify-center rounded-base-x1 border border-white',
								item === bet
									? 'border-solid bg-gradient bg-radial-gradient'
									: 'border-dashed',
							)}
							key={index}
						>
							<Typography variant='text'>{item}</Typography>
						</button>
					))}
				</div>
				<div className='grid grid-cols-7 grid-rows-1 gap-base-x1'>
					{multiplierRates.map((item, index) => (
						<button
							onClick={() => changeMultiplierRate(item)}
							className={cn(
								'flex h-base-x6 w-full items-center justify-center rounded-base-x1 border border-white',
								item === multiplierRate
									? 'border-solid bg-gradient bg-radial-gradient'
									: 'border-dashed',
							)}
							key={index}
						>
							<Typography variant='text'>{item}</Typography>
						</button>
					))}
					<button
						onClick={() => clearBet()}
						className='flex h-base-x6 w-full items-center justify-center rounded-base-x1 border border-dashed border-white'
					>
						<Typography variant='text' className='font-bold'>
							C
						</Typography>
					</button>
				</div>
				{error && (
					<Typography
						variant='text'
						className='text-center text-red opacity-90'
					>
						Не хватает баланса
					</Typography>
				)}
				<Typography
					variant='button'
					className='py-base-x1 text-center uppercase'
				>
					{selectedBet} {selectedCurrency}
				</Typography>
			</div>
		</div>
	)
}
