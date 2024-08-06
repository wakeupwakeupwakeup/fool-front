export const getId = () => {
	return localStorage.getItem('tg_id')
}

export const saveId = async (user: any) => {
	await localStorage.setItem('tg_id', user)
}

export const deleteId = async () => {
	await localStorage.removeItem('tg_id')
}
