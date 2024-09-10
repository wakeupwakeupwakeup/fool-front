import cn from 'clsx'
import { FC } from 'react'

import { TTypeGame } from '@/entities/game/model/game.interface'
import { Typography } from '@/shared/ui/typography'

interface IProps {
	selectedType: TTypeGame
	setSelectedType: (value: TTypeGame) => void
}

const Type: FC<IProps> = ({ selectedType, setSelectedType }) => {
	const types: { name: TTypeGame; title: string; soon?: boolean }[] = [
		{
			name: 'flip_up',
			title: 'Подкидной',
		},
		{
			name: 'translated',
			title: 'Переводной',
			soon: true,
		},
	]

	return (
		<div className='flex flex-col items-center gap-base-x2'>
			<Typography variant='text'>Тип игры</Typography>
			<div className='grid grid-rows-1 grid-cols-2 gap-base-x6 w-full'>
				{types.map(item => (
					<button
						onClick={() => setSelectedType(item.name)}
						key={item.name}
						disabled={item.soon}
						className={cn(
							'flex gap-base-x2 items-center rounded-base-x1 relative py-base-x1 px-base-x3 w-full border border-white',
							item.soon && 'border-opacity-40',
							selectedType === item.name
								? 'border-solid bg-radial-gradient bg-gradient'
								: 'border-dashed',
						)}
					>
						{item.soon && (
							<span className='text-yellow text-base-x3 font-bold absolute left-[50%] transform translate-x-[-50%] -rotate-[15deg]'>
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

export default Type
