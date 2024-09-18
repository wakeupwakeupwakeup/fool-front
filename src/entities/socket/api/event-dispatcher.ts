import { GameEvents } from '@/entities/game/model/game.events'
import { updateGameData } from '@/entities/game'
import { navigateTo } from '@/shared/model'
import { setPlayerTimer } from '@/entities/game/model/local-game-data.slice'

export function eventDispatcher(store, event: MessageEvent<string>) {
	const { message, data } = JSON.parse(event.data)
	switch (message) {
		case GameEvents.ADD_ATTACK_CARD:
		case GameEvents.ADD_DEFEND_CARD:
		case GameEvents.FULL_DATA:
		case GameEvents.NEW_PLAYER:
		case GameEvents.USER_DISCONNECT:
		case GameEvents.PLAYER_LEFT:
		case GameEvents.CANT_ATTACK:
		case GameEvents.CANT_DEFEND:
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
		case GameEvents.MUST_ATTACK:
			store.dispatch(setPlayerTimer(data.attacked_id))
			break
		case GameEvents.MUST_DEFEND:
			store.dispatch(setPlayerTimer(data.defender_id))
			break
		case GameEvents.FINISH_GAME:
			store.dispatch(navigateTo('/home'))
	}
}
