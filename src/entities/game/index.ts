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

export {
	default as gameReducer,
	setGameInfo,
	setPlayersNumber,
} from './model/game.slice'
export {
	default as lobbyReducer,
	setWaiting,
	setIdle,
} from './model/lobby.slice'
