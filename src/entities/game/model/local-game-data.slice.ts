import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TLocalGameDataState = {
	draggingCard: string | null
	gameBoard: Record<string, string>[]
}

const initialState: TLocalGameDataState = {
	draggingCard: null,
	gameBoard: [],
}

const localGameDataSlice = createSlice({
	name: 'localGameData',
	initialState,
	reducers: {
		setDraggingCard(state, action: PayloadAction<string>) {
			state.draggingCard = action.payload
		},
		addCardToBoard(state, action: PayloadAction<Record<string, string>>) {
			state.gameBoard.push(action.payload)
		},
	},
})

const { actions, reducer } = localGameDataSlice
export const { setDraggingCard, addCardToBoard } = actions
export default reducer
