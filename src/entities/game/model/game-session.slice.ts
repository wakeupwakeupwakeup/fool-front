import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGameSession } from '@/entities/game/model/game.interface'

type TGameSessionState = {
	data: IGameSession
}

type TRemoveCardPayload = {
	index: number
	card: string
}

type TPutAttackCardPayload = Record<string, string>

const initialState: TGameSessionState = {
	data: {
		players: [],
		game_status: 'Created',
		game_board: [],
		game_type: null,
		is_first_card_beaten: null,
		player_count: null,
		created_by_id: null,
		currency: null,
		bet: null,
		attacker_id: null,
		defender_id: null,
		deck: [],
		trump: null,
		count_card_in_deck: null,
	},
}

const gameSessionSlice = createSlice({
	name: 'gameSession',
	initialState,
	reducers: {
		updateGameData(state, action: PayloadAction<IGameSession>) {
			state.data = action.payload
		},
	},
})
const { actions, reducer } = gameSessionSlice
export const { updateGameData } = actions
export default reducer
