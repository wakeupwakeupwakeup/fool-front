import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TSocketState = {
	isConnected: boolean
	error: string | null
	gameUuid: string | null
	initData: string | null
	chatId: string | null
}

const initialState: TSocketState = {
	isConnected: false,
	error: null,
	gameUuid: null,
	initData: null,
	chatId: null,
}

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		initSocket(
			state,
			action: PayloadAction<{
				gameUuid: string
				initData: string
				chatId: string
			}>,
		) {
			state.gameUuid = action.payload.gameUuid
			state.initData = action.payload.initData
			state.chatId = action.payload.chatId
			state.error = null
		},
		connectionEstablished(state) {
			state.isConnected = true
			state.error = null
		},
		connectionLost(state) {
			state.isConnected = false
		},
		socketError(state, action: PayloadAction<string>) {
			state.error = action.payload
		},
		closeConnection(state) {
			state.isConnected = false
			state.gameUuid = null
			state.initData = null
			state.chatId = null
		},
	},
})

const { actions, reducer } = socketSlice
export const {
	connectionLost,
	connectionEstablished,
	closeConnection,
	socketError,
	initSocket,
} = actions
export default reducer
