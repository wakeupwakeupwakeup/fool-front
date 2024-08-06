import { ComponentProps } from 'react'

import { TVariant } from '@/components/ui/typography/typography.interface'

export type TSize = 'default' | 'big' | 'small'
export interface IButton extends ComponentProps<'button'> {
	icon?: string
	variant?: TVariant
	sizeIcon?: number
	size?: TSize
}
