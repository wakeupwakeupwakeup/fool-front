import { useEffect, useState } from 'react'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'
import tips from '@/shared/assets/tips.json'

export function LoadingPage({
	onComplete,
}: Readonly<{ onComplete: () => void }>) {
	const [percent, setPercent] = useState(0)
	const [tip] = useState<string>(
		tips.tips[Math.floor(Math.random() * tips.tips.length)],
	)

	useEffect(() => {
		if (percent >= 100) {
			onComplete()
		}
	}, [percent, onComplete])

	useEffect(() => {
		const interval = setInterval(() => {
			setPercent(prev => {
				if (prev < 100) {
					return prev + 1
				} else {
					clearInterval(interval)
					return prev
				}
			})
		}, 30) // Обновляем процент каждые 30 мс

		return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
	}, [onComplete])

	return (
		<div className='flex h-full w-full flex-col items-center justify-evenly'>
			<Icon size={100} icon='logo' />
			<div className='flex w-full flex-col gap-2'>
				<span className='text-center text-base font-bold leading-none tracking-[.46em]'>
					Fool
				</span>
				<div className='w-full px-4'>
					<div
						className='h-1 rounded bg-white'
						style={{ width: `${percent}%` }}
					/>
				</div>
				<span className='text-center text-base leading-none'>
					card game
				</span>
			</div>
			<div className='flex items-center gap-base-x3'>
				<Icon size={38} icon='ton' />
				<Typography variant='button'>TON</Typography>
			</div>
			<Typography variant='text' className='px-4 text-center text-yellow'>
				{tip}
			</Typography>
		</div>
	)
}

export default LoadingPage
