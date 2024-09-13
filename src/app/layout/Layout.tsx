import cn from 'clsx'
import { Fragment, ReactElement, ReactNode, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/shared/ui/logo/Logo'
import Icon from '@/shared/ui/icon/Icon'
// import { getFriendId, getId } from '@/entities/auth'
// import { useAddFriend } from 'src/entities/referral'
// import { getWebSocket, initWebSocket } from '@/shared/api'
// import { IWebSocketResponse } from '@/entities/game'
// import { ModalContext } from '@/app'
import { Typography } from '@/shared/ui/typography'
import { initBackButton, useMiniApp } from '@telegram-apps/sdk-react'

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
	// const modalContext = useContext(ModalContext)
	// const { setInfo, setVisible } = modalContext
	const navigate = useNavigate()
	const [backButton] = initBackButton()
	const { pathname } = useLocation()
	// const friend_id = getFriendId()
	// const tg_id = getId()
	// const { addFriend } = useAddFriend()
	backButton.on('click', () => navigate('/menu'))

	useEffect(() => {
		// if (['/home', '/auth'].includes(pathname)) {
		// 	backButton.hide()
		// } else {
		// 	backButton.show()
		// }
		// if (friend_id && tg_id && friend_id !== tg_id) {
		// 	addFriend(friend_id)
		// }
		// initWebSocket()
		// const socketInstance = getWebSocket().then(socket => {
		// 	socket.onmessage = event => {
		// 		const message: { action: string; data: IWebSocketResponse } =
		// 			JSON.parse(event.data)
		// 		if (message.action === 'invite') {
		// 			setInfo(message.data)
		// 			setVisible(true)
		// 		}
		// 	}
		// 	return socket
		// })
		//
		// return () => {
		// 	socketInstance.then(socketInstance => socketInstance.close())
		// }
	}, [navigate, pathname])

	return (
		<div
			className={cn(
				'relative flex h-full min-h-full flex-col items-center justify-between gap-base-x3',
				pathname === '/game'
					? 'p-base-x3'
					: 'overflow-auto px-[10%] py-base-x4',
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

			{header && (
				<div>
					{!noLogo && <Logo />}
					<div className='relative z-50 flex w-full items-center justify-center gap-base-x2 bg-radial-gradient py-base-x2'>
						<Icon icon={header.icon} size={30} />
						<Typography variant='h1'>{header.title}</Typography>
					</div>
				</div>
			)}
			<div className='flex w-full flex-1 flex-col items-center justify-center gap-base-x4'>
				<div className={cn('w-full py-base-x1', className)}>
					{children}
				</div>
			</div>
			{footer}
		</div>
	)
}

export default Layout
