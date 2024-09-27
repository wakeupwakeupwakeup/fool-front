export interface IUser {
	username: string
	photo_path: string
	chat_id: string
	balance_fool: number
	balance_ton: number
	balance_usdt: number
	balance_notcoin: number
	rating: number
}

export interface ICurrency {
	tether: number
	fool: number
	notcoin: number
	toncoin: number
}
