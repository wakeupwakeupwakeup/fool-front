import { IMenuItem } from './menu.interface'

export const menu: IMenuItem[] = [
	{
		icon: 'fan',
		path: '/create-game',
		title: 'Новая игра',
		soon: false
	},
	{
		icon: 'friends',
		path: '/friends',
		title: 'Друзья',
		soon: false
	},
	{
		icon: 'balance',
		path: '/balance',
		title: 'Баланс',
		soon: false
	},
	{
		icon: 'statistics',
		path: '/statistics',
		title: 'Статистика',
		soon: true
	},
	{
		icon: 'rules',
		path: '/rules',
		title: 'Правила',
		soon: true
	},
	{
		icon: 'subscription',
		path: '/subscription',
		title: 'Подписки',
		soon: false
	},
	{
		icon: 'settings',
		path: '/settings',
		title: 'Настройки',
		soon: true
	}
]
