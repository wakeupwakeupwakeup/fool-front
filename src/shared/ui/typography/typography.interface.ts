import { ComponentProps } from 'react'

export type TVariant = 'h1' | 'button' | 'text'

export interface ITypography extends ComponentProps<'p'> {
	variant: TVariant
}
