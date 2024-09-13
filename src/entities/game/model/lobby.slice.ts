import { createSlice } from '@reduxjs/toolkit'

export type TLobbyState = {
	isWaitingPlayers: boolean
}

const initialState: TLobbyState = {
	isWaitingPlayers: false,
}

const lobbySlice = createSlice({
	name: 'lobby',
	initialState,
	reducers: {
		setWaiting(state) {
			state.isWaitingPlayers = true
		},
		setIdle(state) {
			state.isWaitingPlayers = false
		},
	},
})
const { actions, reducer } = lobbySlice
export const { setWaiting, setIdle } = actions
export default reducer
