import { WS_URL } from '@/shared/api/api.config'
import { store } from '@/app'
import { connectionEstablished, connectionLost } from '@/entities/socket'

export class SocketConnection {
	private static socketInstance: WebSocket | null = null
	private static readonly socketEndpoint = WS_URL
	private static reconnectInterval = 1000
	private static maxReconnectInterval = 30000
	private static reconnectAttempts = 0
	private static maxReconnectAttempts = 10
	private static reconnectTimeout: number | undefined

	private constructor() {}

	public static setInstance(
		gameUuid: string,
		initData: string,
		chatId: number,
	): WebSocket {
		if (!this.socketInstance) {
			this.connect(gameUuid, initData, chatId)
		}

		if (this.socketInstance) {
			return this.socketInstance
		} else {
			throw new Error('WebSocket instance is not available')
		}
	}

	public static getInstance(): WebSocket {
		if (this.socketInstance) {
			return this.socketInstance
		} else {
			throw new Error('WebSocket instance is not created yet')
		}
	}

	private static connect(
		gameUuid: string,
		initData: string,
		chatId: number,
	): void {
		const socketUrl =
			this.socketEndpoint +
			`${gameUuid}?init_data=${initData}&chat_id=${chatId}`
		this.socketInstance = new WebSocket(socketUrl)

		this.socketInstance.onopen = () => {
			this.reconnectAttempts = 0
			this.reconnectInterval = 1000
			store.dispatch(connectionEstablished())
			console.log('DEV | WEBSOCKET CONNECTION OPENED')
		}

		this.socketInstance.onclose = () => {
			this.socketInstance = null
			// this.reconnect(gameUuid, initData, chatId)
			store.dispatch(connectionLost())
			console.log('DEV | WEBSOCKET CONNECTION CLOSED')
		}
	}

	private static reconnect(
		gameUuid: string,
		initData: string,
		chatId: number,
	): void {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectTimeout = window.setTimeout(() => {
				console.log(
					`Reconnecting attempt ${this.reconnectAttempts + 1}`,
				)
				this.reconnectAttempts += 1
				this.reconnectInterval = Math.min(
					this.reconnectInterval * 2,
					this.maxReconnectInterval,
				)
				this.connect(gameUuid, initData, chatId)
			}, this.reconnectInterval)
		} else {
			console.error(
				'Max reconnect attempts reached. Could not reconnect to WebSocket',
			)
		}
	}

	public static closeConnection() {
		if (this.socketInstance) {
			this.socketInstance.close()
			this.socketInstance = null
			if (this.reconnectTimeout) {
				clearTimeout(this.reconnectTimeout)
			}
			store.dispatch(connectionLost())
		}
	}
}
