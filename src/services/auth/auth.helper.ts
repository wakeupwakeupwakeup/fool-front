export const getId = () => {
	return Number(localStorage.getItem('tg_id'))
}

export const saveId = async tg_id => {
	await localStorage.setItem('tg_id', tg_id)
}

export const deleteId = async () => {
	await localStorage.removeItem('tg_id')
}
