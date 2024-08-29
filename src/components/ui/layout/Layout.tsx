import cn from 'clsx'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Typography } from '@/components/ui'
import Logo from '@/components/ui/Logo'

import { IWebSocketResponse } from '@/shared/types/game.interface'

import { getFriendId, getId } from '@/services/auth/auth.helper'

import { useAddFriend, useTelegram } from '@/hooks'
import { useModal } from '@/providers/ModalContext'
import { getWebSocket, initWebSocket } from '@/websocket'

import Icon from '../icon/Icon'

import { ILayout } from './layout.interface'

const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	noLogo,
	className,
	header,
	footer
}) => {
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
				pathname === '/game' ? 'p-base-x3' : 'overflow-auto py-base-x4 px-[10%]'
			)}
		>
			{pathname !== '/game' && (
				<Typography variant='text' className='absolute right-5 text-yellow'>
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
