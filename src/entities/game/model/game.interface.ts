export type TCurrency = 'Usdt' | 'Fool' | 'Notcoin' | 'Ton'
export type TTypeGame = 'flip_up' | 'translated'

export interface IGameRequest {
	bet: number
	currency: TCurrency
	type: TTypeGame
	player_count: number
}

export interface IGame {
	id: string
	host: string
	bet: number
	currency: TCurrency
	type: TTypeGame
	playersNumber: number
}

export interface IWebSocketResponse {
	game: IGame
	photo_url: string
	username: string
	id: string
	place: number
}
