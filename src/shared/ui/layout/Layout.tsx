import cn from 'clsx'
import { ReactElement, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/shared/ui/logo/Logo'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'
import { initBackButton } from '@telegram-apps/sdk-react'

interface ILayout {
	children: ReactNode
	noLogo?: boolean
	footer?: ReactNode
	className?: string
	header?: {
		icon: string
		title: string
	}
}

export function Layout({
	children,
	noLogo,
	className,
	header,
	footer,
}: Readonly<ILayout>): ReactElement {
	const navigate = useNavigate()
	const [backButton] = initBackButton()
	const { pathname } = useLocation()

	backButton.on('click', () => navigate('/menu'))

	return (
		<div
			className={cn(
				'relative flex h-full min-h-full flex-col items-center justify-between gap-base-x3 py-2',
				pathname === '/game' ? '' : 'overflow-auto px-[10%]',
			)}
		>
			{/*{pathname !== '/game' && (*/}
			{/*	<Typography*/}
			{/*		variant='text'*/}
			{/*		className='absolute right-5 text-yellow'*/}
			{/*	>*/}
			{/*		Beta версия*/}
			{/*	</Typography>*/}
			{/*)}*/}
			{!noLogo && <Logo />}
			{header && (
				<div>
					<div className='relative z-50 flex w-full items-center justify-center gap-base-x2 bg-radial-gradient py-base-x2'>
						<Icon icon={header.icon} size={30} />
						<Typography variant='h1'>{header.title}</Typography>
					</div>
				</div>
			)}
			<div className='flex w-full flex-1 flex-col items-center justify-center gap-base-x4'>
				<div className={cn('w-full', className)}>{children}</div>
			</div>
			{footer}
		</div>
	)
}

export default Layout
