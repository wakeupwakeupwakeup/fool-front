import cn from 'clsx'

import { ITypography, TVariant } from '../model/typography.interface'

const config: Record<TVariant, string> = {
	h1: 'text-base-x3 font-medium',
	button: 'text-base-x3 font-bold',
	text: 'text-base-x2 font-regular',
}

export function Typography({
	variant,
	className,
	children,
	...props
}: ITypography) {
	const classes = cn(className, {
		[config[variant]]: variant,
	})

	return (
		<p className={classes} {...props}>
			{children}
		</p>
	)
}
