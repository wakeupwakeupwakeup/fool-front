import { ComponentType } from 'react'
import { HomePage } from '@/pages/home'
import { ReferralPage } from 'src/pages/referrals'
import { BalancePage } from '@/pages/balance'
import CreateGamePage from '@/pages/createGame/ui/create-game-page'

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
	{
		path: '/create-game',
		component: CreateGamePage,
	},
	{
		path: '/referrals',
		component: ReferralPage,
	},
	{
		path: '/balance',
		component: BalancePage,
	},
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
