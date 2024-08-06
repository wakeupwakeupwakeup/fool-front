import { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { getId } from '@/services/auth/auth.helper'

import { unauthorizedRoutes } from '@/navigation/routes/unauthorizedRoutes'
import { userRoutes } from '@/navigation/routes/userRoutes'

const Navigation = () => {
	const tg_id = getId()

	const throwUrl = useMemo(() => {
		return tg_id ? '/menu' : '/auth'
	}, [tg_id])

	const routes = useMemo(() => {
		return tg_id ? userRoutes : unauthorizedRoutes
	}, [tg_id])

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
