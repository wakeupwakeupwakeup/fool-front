export function isAllCardBeaten(gameBoard: Record<string, string>[]): boolean {
	// Проверяем, если gameBoard пустой
	if (!gameBoard.length) {
		return true
	}

	// Проверяем, что все значения всех ключей непустые
	return gameBoard.every(pair => {
		return Object.values(pair).every(value => value !== '')
	})
}
