import { useContext, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '@/app'
import { userRoutes } from './routes/userRoutes'
import { guestRoutes } from './routes/guestRoutes'

export function Navigation() {
	const { id } = useContext(AuthContext)

	console.log('DEV | CURRENT USER ID: ', id)
	const routes = useMemo(() => {
		return id ? userRoutes : guestRoutes
	}, [id])

	function throwUrl() {
		return id ? '/home' : '/auth'
	}

	return (
		<Routes>
			{routes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={throwUrl()} />} />
		</Routes>
	)
}
