import { getId } from '@/entities/auth/lib/auth.helper'

import { WS_URL } from '@/shared/api/api.config'

let socket: WebSocket | null = null

export const initWebSocket = () => {
	const tg_id = getId()

	socket = new WebSocket(`${WS_URL}/ws/global/${tg_id}`)

	socket.onopen = () => {
		console.log('WebSocket connected')
	}

	socket.onclose = () => {
		console.log('WebSocket disconnected')
		window.location.reload()
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
