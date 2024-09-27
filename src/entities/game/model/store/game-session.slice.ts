import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGameSession } from '@/entities/game/model/types/game.model'
import { TPlayer } from '@/entities/player/model/types/player.model'

type TGameSessionState = {
	data: IGameSession
}

const initialState: TGameSessionState = {
	data: {
		players: [],
		game_status: 'Created',
		game_board: [],
		game_type: null,
		is_first_card_beaten: null,
		player_count: null,
		created_by_id: null,
		currency: null,
		bet: null,
		attacker_id: null,
		defender_id: null,
		deck: [],
		trump: null,
		count_card_in_deck: null,
	},
}

const gameSessionSlice = createSlice({
	name: 'gameSession',
	initialState,
	reducers: {
		updateGameData(state, action: PayloadAction<IGameSession>) {
			state.data = action.payload
		},
		removeCardFromHand(
			state,
			action: PayloadAction<{ chatId: string; card: string }>,
		) {
			console.log('DEV | REMOVING CARD:', action.payload)
			const player = state.data.players.find(
				(player: TPlayer) => player.chat_id === action.payload.chatId,
			)
			if (player) {
				player.card_in_hand = player.card_in_hand.filter(
					(card: string) => card !== action.payload.card,
				)
			}
		},
		addCardToBoard(state, action: PayloadAction<Record<string, string>>) {
			state.data.game_board.push(action.payload)
		},
		addCardToHand(
			state,
			action: PayloadAction<{ chatId: string; card: string }>,
		) {
			const player = state.data.players.find(
				(player: TPlayer) => player.chat_id === action.payload.chatId,
			)
			if (player) {
				player.card_in_hand.push(action.payload.card)
			}
		},
		putDefendingCard(
			state,
			action: PayloadAction<{ attackingCard: string; card: string }>,
		) {
			const { attackingCard, card } = action.payload

			const cardPair = state.data.game_board.find(
				(pair: Record<string, string>) =>
					Object.keys(pair)[0] === attackingCard,
			)

			if (cardPair) {
				cardPair[attackingCard] = card
			}
		},
		finishPlayerCycle(state, action: PayloadAction<string>) {
			const player = state.data.players.find(
				(player: TPlayer) => player.chat_id === action.payload,
			)

			if (player) {
				player.finish_cycle = true
			}
		},
	},
})
const { actions, reducer } = gameSessionSlice
export const {
	updateGameData,
	removeCardFromHand,
	addCardToBoard,
	putDefendingCard,
	finishPlayerCycle,
	addCardToHand,
} = actions
export default reducer
