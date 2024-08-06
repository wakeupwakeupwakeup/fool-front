import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

import { ITypography, TVariant } from './typography.interface'

const Typography: FC<PropsWithChildren<ITypography>> = ({
	variant,
	className,
	children,
	...props
}) => {
	const config: Record<TVariant, string> = {
		h1: 'text-base-x3 font-medium',
		button: 'text-base-x3 font-bold',
		text: 'text-base-x2 font-regular'
	}

	const classes = cn(className, {
		[config[variant]]: variant
	})

	return (
		<p className={classes} {...props}>
			{children}
		</p>
	)
}

export default Typography
