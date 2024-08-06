import { ReactNode } from 'react'

export interface ILayout {
	noLogo?: boolean
	footer?: ReactNode
	className?: string
	header?: {
		icon: string
		title: string
	}
}
