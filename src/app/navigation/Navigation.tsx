import { useContext, useEffect, useMemo } from 'react'
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { AuthContext } from '@/app'
import { userRoutes } from './routes/userRoutes'
import { guestRoutes } from './routes/guestRoutes'
import { useInitData } from '@telegram-apps/sdk-react'
import { parseInviteString } from '@/shared/lib/parse-start-param'
import { useAuth } from '@/entities/auth/lib/hooks/useAuth'
import Loader from '@/shared/ui/loader/Loader'

export function Navigation() {
	const { id } = useContext(AuthContext)
	const initData = useInitData()
	const { isSuccess } = useAuth()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const routes = useMemo(() => {
		return id ? userRoutes : guestRoutes
	}, [id])

	useEffect(() => {
		console.log(initData)
		if (pathname === '/') {
			if (initData?.startParam) {
				const { gameUUID } = parseInviteString(initData.startParam)

				if (gameUUID) {
					localStorage.setItem('game_uuid', gameUUID)
					navigate('/lobby')
				} else navigate('/home')
			} else navigate('/home')
		}
	}, [])

	return isSuccess ? (
		<Routes>
			{routes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
		</Routes>
	) : (
		<Loader />
	)
}
