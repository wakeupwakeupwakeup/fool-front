export type TSizeType = 's' | 'm' | 'l'
type TSizes = {
	height: string
	width: string
}

export const cardSizes: Record<TSizeType, TSizes> = {
	s: {
		height: '120px',
		width: '80px',
	},
	m: {
		height: '135px',
		width: '95px',
	},
	l: {
		height: '145px',
		width: '100px',
	},
}
