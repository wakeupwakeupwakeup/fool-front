import { configureStore } from '@reduxjs/toolkit'
import { remoteGameDataReducer, localGameDataReducer } from '@/entities/game'
import { socketMiddleware, socketReducer } from '@/entities/socket'
import { useDispatch } from 'react-redux'
import { navigationReducer } from '@/app/navigation/store'

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
