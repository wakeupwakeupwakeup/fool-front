// import { useSpring, animated } from '@react-spring/web'
// import { useEffect, useState } from 'react'
//
// export function DealCards() {
// 	const [deal, setDeal] = useState(false)
//
// 	const springProps = useSpring({
// 		from: { transform: `translate(0px, -500px) rotate(0deg)`, opacity: 0 }, // Исходная позиция
// 		to: {
// 			transform: deal
// 				? `translate(${translateX}px, 0px) rotate(${cardRotation}deg)` // Финальная позиция карты
// 				: `translate(0px, -500px) rotate(0deg)`, // Если карты еще не сданы, остаются на исходной позиции
// 			opacity: deal ? 1 : 0,
// 		},
// 		config: { tension: 200, friction: 20 }, // Настройки анимации для плавности
// 	})
//
// 	useEffect(() => {
// 		setTimeout(() => {
// 			setDeal(true)
// 		})
// 	}, [])
//
// 	return (
// 		<animated.div
// 			ref={drag}
// 			className={cn(`shrink-0 transition-transform duration-300`, {
// 				'-ml-[70px] shadow-lg first:ml-0': position === 'hand',
// 			})}
// 			style={{
// 				...springProps, // Добавляем анимационные свойства
// 				zIndex: index + 20,
// 				width: size ? cardSizes[size].width : '120px',
// 				height: size ? cardSizes[size].height : '165px',
// 				backgroundImage: `url(/cards/${suit}.svg)`,
// 				backgroundRepeat: 'no-repeat',
// 				transformOrigin: 'bottom center',
// 			}}
// 		/>
// 	)
// }
