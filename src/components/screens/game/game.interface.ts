export type TSizeCard = 'big' | 'normal' | 'small'
export type TPositionCard = 'top' | 'bottom'
export type TSuitCard = 'spades' | 'hearts' | 'diamonds' | 'clubs'
export type TValueCard = number | 'king' | 'queen' | 'jack' | 'ace'

export interface ITypeCard {
	suit: TSuitCard
	value: TValueCard
}

export interface IPlayer {
	tg_id: number
	username: string
	photo_url: string
	place: number
	countCards?: number
}

export interface IAddRivalProps {
	global_ws: WebSocket
	tg_id: number
	place: number
	game_id: string
}

export const cardSizeToDimensions = {
	big: { width: '95px', height: '135px', radius: '12px' },
	normal: { width: '95px', height: '135px', radius: '12px' },
	small: { width: '57px', height: '81px', radius: '7.2px' }
}
