import { configureStore } from '@reduxjs/toolkit'
import { remoteGameDataReducer, localGameDataReducer } from '@/entities/game'
import { socketReducer } from '@/entities/socket'
// import { socketMiddleware } from '@/entities/socket/lib/socket-middleware'
import { useDispatch } from 'react-redux'
import socketMiddleware from '@/entities/socket/lib/socket-middleware'
import { navigationReducer } from '@/shared/model'

export const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(socketMiddleware),
	reducer: {
		remoteGameData: remoteGameDataReducer,
		socket: socketReducer,
		navigation: navigationReducer,
		localGameData: localGameDataReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
