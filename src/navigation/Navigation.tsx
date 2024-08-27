import { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { unauthorizedRoutes } from '@/navigation/routes/unauthorizedRoutes'
import { userRoutes } from '@/navigation/routes/userRoutes'
import { useAuth } from '@/providers/AuthContext'

const Navigation = () => {
	const { id } = useAuth()

	const routes = useMemo(() => {
		return id ? userRoutes : unauthorizedRoutes
	}, [id])

	const throwUrl = useMemo(() => {
		return id ? '/picks' : '/welcome'
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

export default Navigation
