export type {
	IWebSocketResponse,
	IGame,
	TTypeGame,
	IGameRequest,
	TCurrency,
} from './model/game.interface'
export {
	getGame,
	saveGame,
	deleteGame,
	getPlace,
	savePlace,
	deletePlace,
} from './lib/game.helper'
