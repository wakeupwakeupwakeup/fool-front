import { animated, useSpring } from '@react-spring/web'
import cn from 'clsx'
import { FC, useState } from 'react'

import { TPositionCard } from '@/pages/game/game.interface'

import Card from './Card'

interface IProps {
	from: number[]
	to: number[]
	scale: number
	type?: string
	position?: TPositionCard
	animation?: boolean
}

const FlyingCard: FC<IProps> = ({
	from,
	type,
	to,
	scale,
	position,
	animation = false,
}) => {
	const [visible, setVisible] = useState<string>('block')
	const springs = useSpring({
		from: { y: from[0], x: from[1] },
		to: { y: to[0], x: to[1] },
		onRest: () => {
			setVisible('none')
		},
	})

	return (
		<div
			className={cn(
				'absolute top-0',
				scale == 50 ? 'scale-50' : 'scale-[78%]',
			)}
			style={{ display: visible }}
		>
			<animated.div style={{ ...(springs as any) }}>
				<div
					className={cn(
						'rounded-base-x2 text-black',
						animation
							? 'scale-[90%] w-[110px] h-[140px]'
							: 'w-[93px] h-[130px]',
					)}
				>
					<Card type={type} position={position} />
				</div>
			</animated.div>
		</div>
	)
}

export default FlyingCard
