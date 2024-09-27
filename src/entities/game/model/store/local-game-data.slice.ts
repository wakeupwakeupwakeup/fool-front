import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TLocalGameDataState = {
	draggingCard: string | null
	playerTimerId: number | null
}

const initialState: TLocalGameDataState = {
	draggingCard: null,
	playerTimerId: null,
}

const localGameDataSlice = createSlice({
	name: 'localGameData',
	initialState,
	reducers: {
		setDraggingCard(state, action: PayloadAction<string>) {
			state.draggingCard = action.payload
		},
		setPlayerTimer(state, action: PayloadAction<number>) {
			state.playerTimerId = action.payload
		},
	},
})

export const getDraggingCard = (state: TLocalGameDataState) =>
	state.draggingCard

const { actions, reducer } = localGameDataSlice
export const { setDraggingCard, setPlayerTimer } = actions
export default reducer
