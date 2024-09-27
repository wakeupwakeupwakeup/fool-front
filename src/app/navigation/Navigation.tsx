import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { userRoutes } from './routes/userRoutes'
import { useInitData, useInitDataRaw } from '@telegram-apps/sdk-react'
import { parseInviteString } from '@/entities/auth/lib/parse-start-param'
import Loader from '@/shared/ui/loader/Loader'
import { useAuth } from '@/entities/auth'
import { LoadingPage } from '@/pages/loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'
import { initSocket } from '@/entities/socket/model/store/socket.slice'

export function Navigation() {
	const shouldNavigate = useSelector(
		(state: RootState) => state.navigation.path,
	)
	const [firstStart] = useState<boolean>(
		!sessionStorage.getItem('first_start'),
	)
	const [loadingComplete, setLoadingComplete] = useState(false)

	// const initData = useInitData()
	const initData = useInitData()
	const { isSuccess } = useAuth()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const chatId = localStorage.getItem('chat_id')
	const dispatch = useDispatch()
	// useEffect(() => {
	// 	if (initData && chatId) {
	// 		dispatch(
	// 			initSocket({
	// 				chatId: chatId,
	// 				gameUuid: 'e3bb10ee-008c-4b48-8cea-9d3a174076a5',
	// 				initData: initData,
	// 			}),
	// 		)
	// 	}
	// 	navigate('/game')
	// }, [chatId, initData, navigate])

	useEffect(() => {
		if (shouldNavigate) navigate(shouldNavigate)
		if (pathname === '/') {
			if (initData?.startParam) {
				const { gameUUID } = parseInviteString(initData.startParam)

				if (gameUUID) {
					localStorage.setItem('game_uuid', gameUUID)
					navigate('/lobby')
				} else navigate('/home')
			} else navigate('/home')
		}
		if (firstStart) {
			sessionStorage.setItem('first_start', 'true')
		}
	}, [firstStart, initData, isSuccess, navigate, pathname, shouldNavigate])

	if (!initData || !isSuccess) {
		return <Loader />
	}

	if (firstStart && !loadingComplete) {
		return <LoadingPage onComplete={() => setLoadingComplete(true)} />
	}

	return isSuccess ? (
		<Routes>
			{userRoutes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
		</Routes>
	) : (
		<Loader />
	)
}
