export function getId() {
	return localStorage.getItem('tg_id')
}

export function saveId(tgId: string) {
	return localStorage.setItem('tg_id', tgId)
}

export function deleteId() {
	return localStorage.removeItem('tg_id')
}

export function getFriendId() {
	return localStorage.getItem('friend_id')
}

export function saveFriendId(tgId: string) {
	return localStorage.setItem('friend_id', tgId)
}

export function deleteFriendId() {
	return localStorage.removeItem('friend_id')
}
