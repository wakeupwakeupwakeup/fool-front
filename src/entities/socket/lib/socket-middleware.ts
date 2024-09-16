import { Middleware } from '@reduxjs/toolkit'
import { SocketConnection } from '@/entities/socket/model/socket-factory'
import { initSocket, socketError } from '@/entities/socket/model/socket.slice'
import { updateGameData } from '@/entities/game/model/game-session.slice'
import { IGameSession } from '@/entities/game/model/game.interface'
import { eventDispatcher } from '@/entities/socket/lib/event-dispatcher'

// types.ts
export interface InitSocketPayload {
	gameUuid: string
	initData: string
	chatId: number
}

export interface SendMessagePayload {
	message: string // или другой тип для сообщений
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

const socketMiddleware: Middleware = store => {
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
				}

				socketInstance.onerror = error => {
					store.dispatch(socketError('WebSocket error occurred'))
					console.error('WebSocket error:', error)
				}

				socketInstance.onmessage = (event: MessageEvent<string>) => {
					const message: TMessageEvent = JSON.parse(event.data)
					console.log('Received message:', message)
					console.log('Received data:', message.data)
					if (socketInstance) {
						eventDispatcher(store, socketInstance, event)
					}
				}
			} catch (error) {
				store.dispatch(
					socketError('Failed to initialize WebSocket connection'),
				)
				console.error('Error initializing WebSocket:', error)
			}
		}
		// switch (action.type) {

		//
		// 	case 'socket/sendMessage': {
		// 		if (
		// 			socketInstance &&
		// 			socketInstance.readyState === WebSocket.OPEN
		// 		) {
		// 			socketInstance.send(action.payload)
		// 			console.log('Message sent:', action.payload)
		// 		} else {
		// 			console.error(
		// 				'WebSocket is not open, message cannot be sent',
		// 			)
		// 		}
		// 		break
		// 	}
		//
		// 	case 'socket/closeSocket': {
		// 		if (socketInstance) {
		// 			socketInstance.close()
		// 			socketInstance = null
		// 			console.log('WebSocket connection closed manually')
		// 		}
		// 		break
		// 	}
		//
		// 	default:
		// 		break
		// }

		return next(action)
	}
}

export default socketMiddleware
