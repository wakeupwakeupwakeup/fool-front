export type TPlayer = {
	chat_id: string
	card_in_hand: string[]
	count_card_in_hand: number
	username: string
	photo_path: string
	is_ready: boolean
	disconnect: boolean
	disconnect_time: string
	finish_cycle: boolean
	win_place: number
	index: number
}
