export type {
	IGameConfig,
	TTypeGame,
	IGameRequest,
	TCurrency,
} from './model/game.interface'

export {
	default as gameSessionReducer,
	updateGameData,
} from './model/game-session.slice'
