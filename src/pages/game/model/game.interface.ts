export type TSizeCard = 'big' | 'normal' | 'small'
export type TPositionCard = 'top' | 'bottom'

export const cardSizeToDimensions = {
	big: { width: '120px', height: '165px', radius: '12px' },
	normal: { width: '95px', height: '135px', radius: '12px' },
	small: { width: '46px', height: '63px', radius: '2px' },
}
