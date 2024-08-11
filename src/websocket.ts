import { getId } from '@/services/auth/auth.helper'

import { WS_URL } from '@/config/api.config'

let socket: WebSocket | null = null

export const initWebSocket = () => {
	const tg_id = getId()

	if (!tg_id) return

	socket = new WebSocket(`${WS_URL}/ws/global/${tg_id}`)

	socket.onopen = () => {
		console.log('WebSocket connected')
	}

	socket.onclose = () => {
		console.log('WebSocket disconnected')
		// initWebSocket()
	}

	socket.onerror = error => {
		console.error('WebSocket error:', error)
	}

	socket.onmessage = event => {
		console.log('WebSocket message:', event)
	}
}

export const getWebSocket = (): WebSocket => {
	if (!socket) {
		initWebSocket()

		new Error('WebSocket is not initialized')
	}
	return socket
}
