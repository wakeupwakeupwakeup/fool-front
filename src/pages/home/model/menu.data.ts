interface IMenuItem {
	icon: string
	title: string
	path: string
	soon: boolean
}

export const menu: IMenuItem[] = [
	{
		icon: 'fan',
		path: '/create-game',
		title: 'Новая игра',
		soon: false,
	},
	{
		icon: 'friends',
		path: '/referrals',
		title: 'Друзья',
		soon: false,
	},
	{
		icon: 'balance',
		path: '/balance',
		title: 'Баланс',
		soon: false,
	},
	{
		icon: 'statistics',
		path: '/statistics',
		title: 'Статистика',
		soon: true,
	},
	{
		icon: 'rules',
		path: '/rules',
		title: 'Правила',
		soon: true,
	},
	{
		icon: 'subscription',
		path: '/subscription',
		title: 'Подписки',
		soon: true,
	},
	{
		icon: 'settings',
		path: '/settings',
		title: 'Настройки',
		soon: true,
	},
]
