export type {
	IGameConfig,
	TTypeGame,
	IGameRequest,
	TCurrency,
} from './model/game.interface'

export {
	default as remoteGameDataReducer,
	updateGameData,
} from './model/game-session.slice'

export { default as localGameDataReducer } from './model/local-game-data.slice'
