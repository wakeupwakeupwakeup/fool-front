import { useDragLayer } from 'react-dnd'
import { useEffect } from 'react'

export function DraggingCard() {
	const { item, currentOffset, isDragging } = useDragLayer(monitor => ({
		item: monitor.getItem(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}))

	useEffect(() => {
		console.log('DEV | DRAGGING CARD PREVIEW: ', item)
	}, [item])

	if (!isDragging || !currentOffset) {
		return null
	}

	return (
		<div
			style={{
				position: 'fixed',
				pointerEvents: 'none',
				left: 0,
				top: 0,
				transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
				zIndex: 1000,
			}}
		>
			{/* Кастомный вид перетаскиваемой карты */}
			<div
				style={{
					width: '120px',
					height: '165px',
					backgroundImage: `url(/cards/${item.suit}.svg)`,
					backgroundRepeat: 'no-repeat',
				}}
			/>
		</div>
	)
}
