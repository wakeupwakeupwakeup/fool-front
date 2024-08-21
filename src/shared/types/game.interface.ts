export type TCurrency = 'tether' | 'fool' | 'notcoin' | 'toncoin'
export type TTypeGame = 'flip_up' | 'translated'

export interface IGameRequest {
	bet: number
	currency: TCurrency
	type: TTypeGame
	num_players: number
}

export interface IGame {
	id: string
	host: string
	bet: number
	currency: TCurrency
	type: TTypeGame
	num_players: number
}

export interface IWebSocketResponse {
	game: IGame
	photo_url: string
	username: string
	id: string
	place: number
}
