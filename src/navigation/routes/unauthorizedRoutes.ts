import { Auth, Invite } from '@/components/screens'

import { IRoute } from '../navigation.types'

export const unauthorizedRoutes: IRoute[] = [
	{
		path: '/auth',
		component: Auth
	},
	{
		path: '/invite',
		component: Invite
	}
]
