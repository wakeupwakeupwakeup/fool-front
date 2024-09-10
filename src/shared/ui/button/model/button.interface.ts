import { ComponentProps } from 'react'

import { TVariant } from '@/shared/ui/typography/model/typography.interface'

export type TSize = 'default' | 'big' | 'small'
export interface IButton extends ComponentProps<'button'> {
	icon?: string
	variant?: TVariant
	sizeIcon?: number
	size?: TSize
}
