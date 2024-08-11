import { IAddRivalProps } from './game.interface'

export const addRival = ({
	global_ws,
	tg_id,
	game_id,
	place
}: IAddRivalProps) => {
	let data = {
		action: 'invite',
		tg_id,
		game_id,
		place
	}
	global_ws.send(JSON.stringify(data))
}

export const playCard = ({
	game_ws,
	card
}: {
	game_ws: WebSocket
	card: string
}) => {
	let data = {
		action: 'play_card',
		card: card
	}
	game_ws.send(JSON.stringify(data))
}

export const defendCard = ({
	game_ws,
	card
}: {
	game_ws: WebSocket
	card: string
}) => {
	let data = {
		action: 'defend_card',
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

export const beat = (game_ws: WebSocket) => {
	let data = {
		action: 'beat'
	}
	game_ws.send(JSON.stringify(data))
}
