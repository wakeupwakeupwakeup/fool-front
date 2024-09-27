export function formatPlayerNickname(nickname: string): string {
	if (nickname.length > 8) {
		return nickname.slice(0, 8) + '...'
	}
	return nickname
}
