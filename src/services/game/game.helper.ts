import { IGame } from '@/shared/types/game.interface'

export const saveGame = (data: IGame) => {
	localStorage.removeItem('game')
	localStorage.setItem('game', JSON.stringify(data))
}

export const getGame = () => {
	return JSON.parse(localStorage.getItem('game')) as IGame
}

export const deleteGame = () => {
	localStorage.removeItem('game')
}
export const savePlace = (place: number) => {
	localStorage.removeItem('place')
	localStorage.setItem('place', place.toString())
}

export const getPlace = () => {
	return localStorage.getItem('place')
}

export const deletePlace = () => {
	localStorage.removeItem('place')
}
