import { TSocketMessage } from '@/entities/socket/model/socket.types'

export function sendAction(socket: WebSocket, message: TSocketMessage) {
	switch (message.type) {
		case 'SET_READY':
			socket.send(JSON.stringify({ action: 'Ready' }))
			break
		case 'ATTACK':
			socket.send(
				JSON.stringify({
					action: 'Attack',
					attacking_card: message.payload!.attacking_card,
				}),
			)
			break
		case 'DEFEND':
			socket.send(
				JSON.stringify({
					action: 'Defend',
					attacking_card: message.payload!.attacking_card,
					card: message.payload!.card,
				}),
			)
	}
}
