import { IGame } from '@/entities/game'

export function saveGame(data: IGame) {
	localStorage.removeItem('game')
	localStorage.setItem('game', JSON.stringify(data))
}

export function getGame() {
	return JSON.parse(localStorage.getItem('game')) as IGame
}

export function deleteGame() {
	localStorage.removeItem('game')
}
export function savePlace(place: number) {
	localStorage.removeItem('place')
	localStorage.setItem('place', place.toString())
}

export function getPlace() {
	return localStorage.getItem('place') || 1
}

export function deletePlace() {
	localStorage.removeItem('place')
}
