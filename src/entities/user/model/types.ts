export interface IUser {
	username: string
	photo_url: string
	last_claim: string
	chat_id: string
	balance_fool: number
	balance_ton: number
	balance_usdt: number
	balance_notcoin: number
	cups: number
	is_free: true
}

export interface ICurrency {
	tether: number
	fool: number
	notcoin: number
	toncoin: number
}
