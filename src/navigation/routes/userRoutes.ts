import {
	Balance,
	CreateGame,
	Friends,
	Game,
	Invite,
	Menu,
	Onboarding,
	ResultGame,
	Rules,
	Settings,
	Statistics,
	Subscription
} from '@/components/screens'

import { IRoute } from '../navigation.types'

export const userRoutes: IRoute[] = [
	{
		path: '/menu',
		component: Menu
	},
	{
		path: '/onboarding',
		component: Onboarding
	},
	{
		path: '/game',
		component: Game
	},

	{
		path: '/result-game',
		component: ResultGame
	},

	{
		path: '/create-game',
		component: CreateGame
	},
	{
		path: '/friends',
		component: Friends
	},
	{
		path: '/balance',
		component: Balance
	},
	{
		path: '/statistics',
		component: Statistics
	},
	{
		path: '/rules',
		component: Rules
	},
	{
		path: '/subscription',
		component: Subscription
	},
	{
		path: '/settings',
		component: Settings
	},
	{
		path: '/invite',
		component: Invite
	}
]
