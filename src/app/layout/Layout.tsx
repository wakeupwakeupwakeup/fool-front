import cn from 'clsx'
import { ReactElement, ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/shared/ui/logo/Logo'
import Icon from '@/shared/ui/icon/Icon'
import { useModal } from '@/app/providers/ModalContext'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { getFriendId, getId } from '@/entities/auth'
import { useAddFriend } from '@/entities/friend'
import { getWebSocket, initWebSocket } from '@/shared/api'
import { IWebSocketResponse } from '@/entities/game'
import Typography from '@/shared/ui/typography/Typography'

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
}: ILayout): ReactElement {
	const { setVisible, setInfo } = useModal()
	const { tg } = useTelegram()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const friend_id = getFriendId()
	const tg_id = getId()
	const { addFriend } = useAddFriend()

	useEffect(() => {
		if (['/menu', '/auth'].includes(pathname)) {
			tg.BackButton.hide()
		} else {
			tg.BackButton.show()
		}
		tg.BackButton.onClick(() => navigate('/menu'))
		if (friend_id && tg_id && friend_id !== tg_id) {
			addFriend(friend_id)
		}

		initWebSocket()
		const socket = getWebSocket()

		if (socket) {
			socket.onmessage = event => {
				const message: { action: string; data: IWebSocketResponse } =
					JSON.parse(event.data)
				if (message.action === 'invite') {
					setInfo(message.data)
					setVisible(true)
				}
			}
		}

		return () => {
			socket?.close()
		}
	}, [])

	return (
		<div
			className={cn(
				'flex flex-col justify-between items-center relative h-full min-h-full gap-base-x3',
				pathname === '/game'
					? 'p-base-x3'
					: 'overflow-auto py-base-x4 px-[10%]',
			)}
		>
			{pathname !== '/game' && (
				<Typography
					variant='text'
					className='absolute right-5 text-yellow'
				>
					Beta версия
				</Typography>
			)}
			<div className='flex flex-col items-center gap-base-x4 w-full flex-1'>
				{!noLogo && <Logo />}
				{header && (
					<div className='flex items-center justify-center gap-base-x2 py-base-x2 relative z-50 bg-radial-gradient w-full'>
						<Icon icon={header.icon} size={30} />
						<Typography variant='h1'>{header.title}</Typography>
					</div>
				)}
				<div className={cn('w-full h-full py-base-x1', className)}>
					{children}
				</div>
			</div>
			{footer}
		</div>
	)
}

export default Layout
