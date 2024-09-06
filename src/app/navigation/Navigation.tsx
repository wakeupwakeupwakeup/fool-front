import { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/app/providers/AuthContext'
import { userRoutes } from './routes/userRoutes'
import { guestRoutes } from './routes/guestRoutes'

export function Navigation() {
	const { id } = useAuth()

	const routes = useMemo(() => {
		return id ? userRoutes : guestRoutes
	}, [id])

	const throwUrl = useMemo(() => {
		return id ? '/home' : '/auth'
	}, [id])

	return (
		<Routes>
			{routes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={throwUrl} />} />
		</Routes>
	)
}
