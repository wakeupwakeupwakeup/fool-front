import { ComponentType } from 'react'
import InvitePage from '@/pages/invite/ui/invite-page'
import { HomePage } from '@/pages/home'

export interface IRoute {
	path: string
	component: ComponentType
}

export const userRoutes: IRoute[] = [
	{
		path: '/home',
		component: HomePage,
	},
	// {
	// 	path: '/onboarding',
	// 	component: Onboarding,
	// },
	// {
	// 	path: '/game',
	// 	component: Game,
	// },
	//
	// {
	// 	path: '/result-game',
	// 	component: ResultGame,
	// },
	//
	// {
	// 	path: '/create-game',
	// 	component: CreateGame,
	// },
	// {
	// 	path: '/friends',
	// 	component: Friends,
	// },
	// {
	// 	path: '/balance',
	// 	component: Balance,
	// },
	// {
	// 	path: '/statistics',
	// 	component: Statistics,
	// },
	// {
	// 	path: '/rules',
	// 	component: Rules,
	// },
	// {
	// 	path: '/subscription',
	// 	component: Subscription,
	// },
	// {
	// 	path: '/settings',
	// 	component: Settings,
	// },
	// {
	// 	path: '/invite',
	// 	component: InvitePage,
	// },
]
