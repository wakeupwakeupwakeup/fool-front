import { ComponentType } from 'react'
import InvitePage from '@/pages/invite/ui/invite-page'

interface IRoute {
	path: string
	component: ComponentType
}

export const guestRoutes: IRoute[] = [
	{
		path: '/invite',
		component: InvitePage,
	},
]
