export interface IPlayer {
	username: string
	photo_url: string
	last_claim: string
	chat_id: string
	is_online: boolean
	currency: ICurrency
	cups: number
	is_free: true
}

export interface ICurrency {
	tether: number
	fool: number
	notcoin: number
	toncoin: number
}
