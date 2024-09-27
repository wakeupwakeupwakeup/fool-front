import { TPlayer } from '@/entities/player/model/types/player.model'

export type TCurrency = 'Usdt' | 'Fool' | 'Notcoin' | 'Ton'
export type TTypeGame = 'Throw-in' | 'Passing'
export type TGameStatus = 'Created' | 'In-Progress' | 'Finished' | 'Abandoned'

export interface IGameRequest {
	bet: number
	currency: TCurrency
	type: TTypeGame
	player_count: number
}

export interface IGameResponse extends IGameRequest {
	game_uuid: string
	game_status: string
	created_by_id: string
	create_at: string
}

export interface IGameResultsResponse extends IGameResponse {
	players: {
		chat_id: string
		photo_path: string
		username: string
		status: number
		win_value: string
		rating_value: number
	}[]
}

export interface IGameConfig {
	bet: number | null
	currency: TCurrency | null
	game_type: TTypeGame | null
	player_count: number | null
}

export interface IGameSession extends IGameConfig {
	game_status: TGameStatus | null
	created_by_id: string | null
	is_first_card_beaten: boolean | null
	deck: []
	count_card_in_deck: number | null
	trump: string | null
	game_board: Record<string, string>[]
	attacker_id: number | null
	defender_id: number | null
	players: TPlayer[] | []
}
