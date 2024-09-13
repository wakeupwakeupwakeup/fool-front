import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGame } from '@/entities/game'

export type TGameState = Omit<IGame, 'id' | 'host'>
export type TLobbyState = {
	isWaitingPlayers: false
}

const initialState: TGameState = {
	type: 'flip_up',
	bet: 0,
	currency: 'Fool',
	playersNumber: 1,
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setGameInfo(state, action: PayloadAction<TGameState>) {
			console.log('DEV | SLICE GAME INFO: ', action.payload)
			state = action.payload
		},
		setPlayersNumber: function (state, action: PayloadAction<number>) {
			state.playersNumber = action.payload
		},
	},
})
const { actions, reducer } = gameSlice
export const { setGameInfo, setPlayersNumber } = actions
export default reducer
