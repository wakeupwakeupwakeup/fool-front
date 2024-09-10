export function getId() {
	return localStorage.getItem('chat_id')
}

export function saveId(tgId: string) {
	return localStorage.setItem('chat_id', tgId)
}

export function deleteId() {
	return localStorage.removeItem('chat_id')
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

export function getInitData() {
	return localStorage.getItem('init_data')
}

export function saveInitData(initData: string) {
	return localStorage.setItem('init_data', initData)
}
