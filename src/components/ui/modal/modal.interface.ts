import { ReactNode } from 'react'

export interface IModal {
	show: boolean
	handleClose: () => void
	footer: ReactNode
	header: {
		icon: string
		title: string
	}
}
