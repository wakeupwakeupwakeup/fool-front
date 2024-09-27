import { Middleware } from '@reduxjs/toolkit'
import { SocketConnection } from '@/entities/socket/model/store/socket-factory'
import {
	connectionEstablished,
	initSocket,
	socketError,
} from '@/entities/socket/model/store/socket.slice'
import { IGameSession } from '@/entities/game/model/types/game.model'
import { eventDispatcher } from '@/entities/socket/api/event-dispatcher'

export interface InitSocketPayload {
	gameUuid: string
	initData: string
	chatId: string
}

export interface SendMessagePayload {
	message: string
}

export type SocketAction =
	| { type: 'socket/initSocket'; payload: InitSocketPayload }
	| { type: 'socket/sendMessage'; payload: SendMessagePayload }
	| { type: 'socket/closeSocket' }

type TMessageEvent = {
	success: boolean
	message: string
	data: IGameSession
}

export const socketMiddleware: Middleware = store => {
	let socketInstance: WebSocket | null = null

	return next => (action: SocketAction) => {
		if (initSocket.match(action)) {
			const { gameUuid, initData, chatId } = action.payload

			// Попытка создания WebSocket через SocketConnection
			try {
				socketInstance = SocketConnection.setInstance(
					gameUuid,
					initData,
					chatId,
				)

				socketInstance.onopen = (event: MessageEvent<string>) => {
					console.log('EVENT', event)
					store.dispatch(connectionEstablished())
				}

				socketInstance.onerror = error => {
					store.dispatch(socketError('WebSocket error occurred'))
					console.error('WebSocket error:', error)
				}

				socketInstance.onclose = event => {
					console.log('DEV | CLOSE WS EVENT:', event)
				}

				socketInstance.onmessage = (event: MessageEvent<string>) => {
					console.log(event)
					const message: TMessageEvent = JSON.parse(event.data)
					console.log('Received message:', message)
					console.log('Received data:', message.data)
					if (socketInstance) {
						eventDispatcher(store, event)
					}
				}
			} catch (error) {
				store.dispatch(
					socketError('Failed to initialize WebSocket connection'),
				)
				console.error('Error initializing WebSocket:', error)
			}
		}

		return next(action)
	}
}
