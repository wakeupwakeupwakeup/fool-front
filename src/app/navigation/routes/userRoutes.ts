import { ComponentType } from 'react'
import { HomePage } from '@/pages/home'
import { BalancePage } from '@/pages/balance'
import { GamePage } from '@/pages/game'
import { ReferralPage } from '@/pages/referrals'
import { LobbyPage } from '@/pages/lobby'
import { CreateGamePage } from '@/pages/create-game'
import { ResultPage } from '@/pages/results/result-page'

export interface IRoute {
	path: string
	component: ComponentType
}

export const userRoutes: IRoute[] = [
	{
		path: '/home',
		component: HomePage,
	},
	{
		path: '/lobby',
		component: LobbyPage,
	},
	// {
	// 	path: '/onboarding',
	// 	component: Onboarding,
	// },
	{
		path: '/game',
		component: GamePage,
	},
	//
	{
		path: '/results',
		component: ResultPage,
	},
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
