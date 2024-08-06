export interface IPlayer {
	username: string
	photo_url: string
	last_claim: string
	tg_id: number
	is_online: boolean
	currency: ICurrency
	cups: number
	is_free: true
}

export interface ICurrency {
	tether: number
	foolcoin: number
	notcoin: number
	toncoin: number
}
