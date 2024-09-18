type TMessageType =
	| 'SET_READY'
	| 'ATTACK'
	| 'DEFEND'
	| 'TAKE'
	| 'PASS'
	| 'TIMEOUT'
type TDefendPayload = {
	attacking_card: string
	card?: string
}

export type TSocketMessage = {
	type: TMessageType
	payload?: TDefendPayload
}
