import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TNavigationState = {
	path: string | null
}

const initialState: TNavigationState = {
	path: null,
}

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		navigateTo(state, action: PayloadAction<string>) {
			state.path = action.payload
		},
		resetNavigation(state) {
			state.path = null
		},
	},
})

const { actions, reducer } = navigationSlice
export const { navigateTo, resetNavigation } = actions
export default reducer
