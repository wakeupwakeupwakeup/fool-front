export type TSizeCard = 'big' | 'normal' | 'small'
export type TPositionCard = 'top' | 'bottom'

export interface ICurrentPlayer {
	tg_id: string
	username: string
	photo_url: string
	place: number
	countCards?: number
}

export const cardSizeToDimensions = {
	big: { width: '120px', height: '165px', radius: '12px' },
	normal: { width: '95px', height: '135px', radius: '12px' },
	small: { width: '57px', height: '81px', radius: '7.2px' },
}
