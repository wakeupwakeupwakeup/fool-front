import { animated } from '@react-spring/web'
import { FC, useEffect } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'

interface IProps {
	type: string
	draggableCard: string
	num: number
	total: number
	snapshot: DraggableStateSnapshot
	provided: DraggableProvided
	calculatorCardsLength: (isDragging: boolean, card: string) => void
}

const DraggableCard: FC<IProps> = ({
	type,
	num,
	total,
	draggableCard,
	calculatorCardsLength,
	snapshot,
	provided,
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
					transformOrigin: '0% 100%',
				}}
				className='animated-div absolute overflow-hidden rounded-base-x1 pb-0 shadow-2xl transition ease-linear'
			>
				<div
					className='h-[165px] w-[120px] bg-cover bg-no-repeat'
					style={{
						backgroundImage: `url(./cards/${type}.svg)`,
					}}
				/>
			</animated.div>
		</div>
	)
}

export default DraggableCard
