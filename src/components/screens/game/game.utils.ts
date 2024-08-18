export const addRival = (global_ws, tg_id, game_id, place) => {
	let data = {
		action: 'invite',
		tg_id,
		game_id,
		place
	}
	global_ws.send(JSON.stringify(data))
}

export const playCard = (game_ws, card) => {
	let data = {
		action: 'play_card',
		card: card
	}
	game_ws.send(JSON.stringify(data))
}

export const throwInCard = (game_ws, card) => {
	let data = {
		action: 'throw_in_card',
		card: card
	}
	game_ws.send(JSON.stringify(data))
}

export const defendCard = (game_ws, card, card_on_table) => {
	let data = {
		action: 'defend_card',
		card_on_table: card_on_table,
		card: card
	}
	game_ws.send(JSON.stringify(data))
}

export const ready = game_ws => {
	let data = {
		action: 'ready'
	}
	game_ws.send(JSON.stringify(data))
}

export const take = game_ws => {
	let data = {
		action: 'take_cards'
	}
	game_ws.send(JSON.stringify(data))
}

export const beat = game_ws => {
	let data = {
		action: 'beat'
	}
	game_ws.send(JSON.stringify(data))
}
