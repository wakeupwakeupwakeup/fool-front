import { TPlayer } from '@/entities/player/model/player.model'

export function getPlayerIndex(chatId: string, players: TPlayer[]) {
	return players.findIndex((player: TPlayer) => player.chat_id === chatId)
}
