import { configureStore } from '@reduxjs/toolkit'
import { gameSessionReducer } from '@/entities/game'
import { socketReducer } from '@/entities/socket'
// import { socketMiddleware } from '@/entities/socket/lib/socket-middleware'
import { useDispatch } from 'react-redux'
import socketMiddleware from '@/entities/socket/lib/socket-middleware'
import { navigationReducer } from '@/shared/model'

export const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(socketMiddleware),
	reducer: {
		gameSession: gameSessionReducer,
		socket: socketReducer,
		navigation: navigationReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
