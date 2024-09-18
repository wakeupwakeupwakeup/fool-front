import { sendAction } from '@/entities/player/api/player.actions'
import { TSocketMessage } from '@/entities/socket/model/store/socket.types'

export const addRival = (global_ws, tg_id, game_id, place) => {
	const data = {
		action: 'invite',
		tg_id,
		game_id,
		place,
	}
	global_ws.send(JSON.stringify(data))
}

export const attack = (game_ws, card) => {
	const data: TSocketMessage = {
		type: 'ATTACK',
		payload: {
			attacking_card: card,
		},
	}
	sendAction(game_ws, data)
}

export const throwInCard = (game_ws, card) => {
	const data = {
		action: 'throw_in_card',
		card: card,
	}
	game_ws.send(JSON.stringify(data))
}

export const defendCard = (game_ws, card, card_on_table) => {
	const data = {
		action: 'defend_card',
		card_on_table: card_on_table,
		card: card,
	}
	game_ws.send(JSON.stringify(data))
}

export const ready = game_ws => {
	const data = {
		action: 'ready',
	}
	game_ws.send(JSON.stringify(data))
}

export const take = game_ws => {
	const data = {
		action: 'take_cards',
	}
	game_ws.send(JSON.stringify(data))
}

export const beat = game_ws => {
	const data = {
		action: 'beat',
	}
	game_ws.send(JSON.stringify(data))
}

export const nextThrow = game_ws => {
	const data = {
		action: 'next_throw',
	}
	game_ws.send(JSON.stringify(data))
}
