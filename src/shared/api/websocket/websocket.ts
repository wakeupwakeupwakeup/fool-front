import { getId } from '@/entities/auth/lib/auth.helper'

import { WS_URL } from '@/shared/api/api.config'

let socket: WebSocket | null = null

export function initWebSocket(): Promise<WebSocket> {
	const tg_id = getId()

	return new Promise((resolve, reject) => {
		socket = new WebSocket(`${WS_URL}/ws/global/${tg_id}`)

		socket.onopen = () => {
			console.log('WebSocket connected')
			resolve(socket as WebSocket)
		}

		socket.onclose = () => {
			console.log('WebSocket disconnected')
			window.location.reload()
		}

		socket.onerror = error => {
			console.error('WebSocket error:', error)
			reject(error)
		}

		socket.onmessage = event => {
			console.log('WebSocket message:', event)
		}
	})
}

export async function getWebSocket(): Promise<WebSocket> {
	if (!socket) {
		try {
			socket = await initWebSocket()
		} catch (e) {
			throw new Error('WebSocket is not initialized')
		}
	}
	return socket as WebSocket
}
