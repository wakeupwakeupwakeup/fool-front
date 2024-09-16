import { GameEvents } from '@/entities/game/model/game.events'
import { updateGameData } from '@/entities/game'
import { navigateTo } from '@/shared/model'

export function eventDispatcher(
	store,
	socket: WebSocket,
	event: MessageEvent<string>,
) {
	const { message, data } = JSON.parse(event.data)
	switch (message) {
		case GameEvents.NEW_PLAYER:
		case GameEvents.PLAYER_LEFT:
		case GameEvents.USER_READY:
			store.dispatch(updateGameData(data))
			break
		case GameEvents.START_GAME:
			store.dispatch(updateGameData(data))
			store.dispatch(navigateTo('/game'))
			break
		case GameEvents.USER_CONNECT:
			store.dispatch(updateGameData(data))
			store.dispatch(navigateTo('/game'))
			break
	}
}
