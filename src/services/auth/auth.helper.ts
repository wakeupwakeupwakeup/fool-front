export const getId = () => {
	return String(localStorage.getItem('tg_id'))
}

export const saveId = async tg_id => {
	await localStorage.setItem('tg_id', tg_id)
}

export const deleteId = async () => {
	await localStorage.removeItem('tg_id')
}

export const getFriendId = () => {
	return localStorage.getItem('friend_id')
}

export const saveFriendId = async tg_id => {
	await localStorage.setItem('friend_id', tg_id)
}

export const deleteFriendId = async () => {
	await localStorage.removeItem('friend_id')
}
