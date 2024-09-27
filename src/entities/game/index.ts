export type {
	IGameConfig,
	TTypeGame,
	IGameRequest,
	TCurrency,
} from './model/types/game.model'

export {
	default as remoteGameDataReducer,
	updateGameData,
} from './model/store/game-session.slice'

export { default as localGameDataReducer } from './model/store/local-game-data.slice'
