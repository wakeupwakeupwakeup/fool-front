import cn from 'clsx'

import { TTypeGame } from '@/entities/game/model/game.interface'
import { Typography } from '@/shared/ui/typography'
import { ReactElement } from 'react'

interface IProps {
	selectedType: TTypeGame
	setSelectedType: (value: TTypeGame) => void
}

export function Type({ selectedType, setSelectedType }: IProps): ReactElement {
	const types: { name: TTypeGame; title: string; soon?: boolean }[] = [
		{
			name: 'Throw-in',
			title: 'Подкидной',
		},
		{
			name: 'Passing',
			title: 'Переводной',
			soon: true,
		},
	]

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>Тип игры</Typography>
			<div className='grid w-full grid-cols-2 grid-rows-1 gap-base-x6'>
				{types.map(item => (
					<button
						onClick={() => setSelectedType(item.name)}
						key={item.name}
						disabled={item.soon}
						className={cn(
							'relative flex w-full items-center gap-base-x2 rounded-base-x1 border border-white px-base-x3 py-base-x1',
							item.soon && 'border-opacity-40',
							selectedType === item.name
								? 'border-solid bg-gradient bg-radial-gradient'
								: 'border-dashed',
						)}
					>
						{item.soon && (
							<span className='absolute left-[50%] translate-x-[-50%] -rotate-[15deg] transform text-base-x3 font-bold text-yellow'>
								soon
							</span>
						)}
						<Typography
							variant='text'
							className={cn(item.soon && 'opacity-40')}
						>
							{item.title}
						</Typography>
					</button>
				))}
			</div>
		</div>
	)
}
