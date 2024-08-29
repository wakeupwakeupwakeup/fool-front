import { animated } from '@react-spring/web'
import { FC, useEffect } from 'react'

interface IProps {
	type: string
	draggableCard: string
	num: number
	total: number
	snapshot?: any
	provided?: any
	calculatorCardsLength: (isDragging: boolean, card: string) => void
}

const DraggableCard: FC<IProps> = ({
	type,
	num,
	total,
	draggableCard,
	calculatorCardsLength,
	snapshot,
	provided
}) => {
	const angleOffset = 2

	useEffect(() => {
		calculatorCardsLength(snapshot.isDragging, type)
	}, [snapshot.isDragging])

	useEffect(() => {
		if (snapshot.isDropAnimating && draggableCard) {
			calculatorCardsLength(!!snapshot.dropAnimation, type)
		}
	}, [snapshot.isDropAnimating])
	return (
		<div
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}
		>
			<animated.div
				ref={provided.innerRef}
				style={{
					transform: !snapshot.isDragging
						? `rotate(${
								(num - (total - 1) / 2) * angleOffset
						  }deg) translateX(-40px) scale(1)`
						: `rotate(${
								(num - (total - 1) / 2) * angleOffset
						  }deg) translateX(-40px)  scale(1)`,
					transformOrigin: '0% 100%'
				}}
				className='animated-div transition ease-linear overflow-hidden rounded-base-x1 shadow-2xl absolute pb-0'
			>
				<div
					className='w-[120px] h-[165px] bg-no-repeat bg-cover'
					style={{
						backgroundImage: `url(./cards/${type}.svg)`
					}}
				/>
			</animated.div>
		</div>
	)
}

export default DraggableCard
