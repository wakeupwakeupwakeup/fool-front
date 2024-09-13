import { configureStore } from '@reduxjs/toolkit'
import { gameReducer, lobbyReducer } from '@/entities/game'

export const store = configureStore({
	reducer: {
		game: gameReducer,
		lobby: lobbyReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
