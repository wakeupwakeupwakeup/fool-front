type TMessageType = 'SET_READY' | 'ATTACK' | 'DEFEND'
type TDefendPayload = {
	attacking_card: string
	card?: string
}

export type TSocketMessage = {
	type: TMessageType
	payload?: TDefendPayload
}
