export function parseInviteString(str: string): {
	id: string
	gameUUID?: string
} {
	const parts = str.split('_')

	// Проверяем, что строка начинается с 'invite' и что после нее идет хотя бы одно число
	if (parts[0] === 'invite' && parts.length >= 2) {
		const id = parts[1] // Числовой идентификатор после 'invite_'

		// Если строка содержит еще части для game
		if (parts.length === 4 && parts[2] === 'game') {
			const gameUUID = parts[3] // Идентификатор игры после 'game_'
			return { id, gameUUID }
		}

		// Если gameUUID нет, возвращаем только id
		return { id }
	}

	// Если строка не соответствует шаблону, возвращаем объект с пустыми полями
	return { id: '', gameUUID: undefined }
}
