import { TSocketMessage } from '@/entities/socket/model/store/socket.types'

export function sendAction(socket: WebSocket, message: TSocketMessage) {
	console.log('DEV | SENDING SOCKET MESSAGE: ', message)
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
			break
		case 'TAKE':
			socket.send(
				JSON.stringify({
					action: 'Get',
				}),
			)
			break
		case 'PASS':
			socket.send(
				JSON.stringify({
					action: 'Pass',
				}),
			)
			break
		case 'TIMEOUT':
			socket.send(
				JSON.stringify({
					action: 'Timeout',
				}),
			)
			break
	}
}
