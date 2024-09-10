import { ReactElement, useEffect, useState } from 'react'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'

export function LoadingPage(): ReactElement {
	const [percent, setPercent] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setPercent(prev => (prev < 100 ? prev + 1 : prev))
		}, 30) // Обновляем процент каждые 30 мс

		return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
	}, [])

	return (
		<div className='flex flex-col gap-[120px] items-center justify-center h-full w-full'>
			<Icon size={100} icon='logo' />
			<div className='flex flex-col items-center gap-base-x1 w-full'>
				<span className='text-base-x3 text-center font-bold leading-none tracking-[.46em]'>
					Fool
				</span>
				<div className='relative w-full'>
					<div className='bg-white opacity-25 h-1 absolute top-0 right-0 left-0' />
					<div
						className='bg-white h-1 absolute top-0'
						style={{ width: `${percent}%` }}
					/>
				</div>

				<span className='text-base-x2 text-center leading-none'>
					card game
				</span>
			</div>
			<div className='flex items-center gap-base-x3'>
				<Icon size={38} icon='toncoin' />
				<Typography variant='button'>TON</Typography>
			</div>
		</div>
	)
}

export default LoadingPage
