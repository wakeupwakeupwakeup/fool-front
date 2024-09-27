import cn from 'clsx'
import Icon from '@/shared/ui/icon/Icon'
import * as config from '../model/button.config'
import { IButton } from '../model/button.interface'
import { Typography } from '@/shared/ui/typography'

export function Button({
	children,
	icon,
	variant,
	className,
	size = 'default',
	sizeIcon,
	...props
}: IButton) {
	return (
		<button
			className={cn(
				className,
				'relative flex w-full items-center justify-center gap-base-x2 rounded-base-x1 bg-gradient',
				[config.classes[size]],
			)}
			{...props}
		>
			{icon && <Icon icon={icon} color='#fff' size={sizeIcon || 25} />}
			{children && (
				<Typography variant={variant || 'button'}>
					{children}
				</Typography>
			)}
		</button>
	)
}

export default Button
