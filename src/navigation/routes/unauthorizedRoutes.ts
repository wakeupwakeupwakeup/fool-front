import { Auth } from '@/components/screens'

import { IRoute } from '../navigation.types'

export const unauthorizedRoutes: IRoute[] = [
	{
		path: '/auth',
		component: Auth
	}
]
